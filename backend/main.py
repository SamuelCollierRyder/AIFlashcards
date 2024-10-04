import json
from openai import OpenAI
from flask import Flask, jsonify, request
from bson import json_util
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

with open("../secrets.json") as f:
    data = json.load(f)
    uri = data["mongodb_uri"]
    secret_key = data["secret_key"]
    jwt_secret_key = data["jwt_secret_key"]
    open_ai_client = OpenAI(api_key=data["openai_key"])

# Create a new client and connect to the server
mongo_db_client = MongoClient(uri, server_api=ServerApi("1"))
cards = mongo_db_client.flashCards.cards
user_credentials = mongo_db_client.flashCards.userCredentials

app = Flask(__name__)
CORS(app)
app.secret_key = secret_key
app.config["JWT_SECRET_KEY"] = jwt_secret_key
jwt = JWTManager(app)


# Card manipulation
@app.route("/get-cards", methods=["GET", "POST"])
@jwt_required()
def get_cards():
    results = cards.find({"email": get_jwt_identity()})
    return json_util.dumps(results), 200


@app.route("/add-card", methods=["GET", "POST"])
@jwt_required()
def add_card():
    question = request.args.get("question")
    answer = request.args.get("answer")
    result = cards.insert_one(
        {
            "question": question,
            "answer": answer,
            "email": get_jwt_identity(),
        }
    )
    return jsonify({"inserted_id": str(result.inserted_id)}), 201


# User authentication
@app.route("/sign-up", methods=["POST"])
def sign_up():
    email = request.args.get("email")
    results = user_credentials.find_one({"email": email})
    if results is None:
        password = request.args.get("password", "")

        print(email, password)
        if email == "" or password == "":
            return jsonify({"error": "Email and password are required"}), 400

        result = user_credentials.insert_one(
            {"email": email, "password": generate_password_hash(password)}
        )
        return jsonify({"inserted_id": str(result.inserted_id)}), 201

    else:
        return jsonify({"error": "User already exists"}), 400


@app.route("/log-in", methods=["POST"])
def login():
    email = request.args.get("email")
    password = request.args.get("password", "")
    credential_results = user_credentials.find_one({"email": email})

    if credential_results:
        hash_password = credential_results.get("password")
        if check_password_hash(hash_password, password):
            access_token = create_access_token(identity=email)
            refresh_token = create_refresh_token(identity=email)
            return jsonify(access_token=access_token, refresh_token=refresh_token), 200
    return jsonify({"error": "Invalid email or password"}), 401


@app.route("/get-user", methods=["GET"])
@jwt_required()
def getUser():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route("/refresh-token", methods=["GET"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token), 200


# OpenAI API
@app.route("/get-answer", methods=["POST", "GET"])
@jwt_required()
def get_answer():
    question = request.args.get("question")
    chat_completion = open_ai_client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"You are a bot for a flashcard app, give me the answer to this question: {question}",
            }
        ],
        model="gpt-4",
    )
    answer = chat_completion.choices[0].message.content
    return jsonify({"answer": answer}), 200


@app.route("/get-cards-from-file", methods=["POST", "GET"])
@jwt_required()
def get_cards_from_file():
    content = request.form.get("content")
    chat_completion = open_ai_client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""Create questions and answers based on the context of this text. Only return a JSON object with questions and answers. Content: {content}""",
            }
        ],
        model="gpt-4",
    )
    answer = chat_completion.choices[0].message.content
    return jsonify({"answer": answer}), 200


if __name__ == "__main__":
    app.run(debug=True)
