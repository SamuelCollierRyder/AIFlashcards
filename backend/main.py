import json
from flask import Flask, jsonify, request
from bson import json_util
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
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

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi("1"))
collection = client.flashCards.flashCards
user_credentials = client.flashCards.userCredentials

app = Flask(__name__)
CORS(app)
app.secret_key = secret_key
app.config["JWT_SECRET_KEY"] = jwt_secret_key
jwt = JWTManager(app)


@app.route("/", methods=["GET"])
def get_cards():
    results = list(collection.find())

    # Use json_util to convert MongoDB data to JSON
    json_data = json.loads(json_util.dumps(results))

    # Return results as JSON
    return jsonify(json_data)


@app.route("/add", methods=["GET", "POST"])
def add():
    result = collection.insert_one(
        {"question": "What is the capital of France?", "answer": "Paris"}
    )
    return jsonify({"inserted_id": str(result.inserted_id)}), 201


@app.route("/sign-up", methods=["GET", "POST"])
def sign_up():
    email = request.args.get("email")
    results = user_credentials.find_one({"email": email})
    if results is None:
        password = request.args.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        result = user_credentials.insert_one(
            {"email": email, "password": generate_password_hash(password)}
        )
        return jsonify({"inserted_id": str(result.inserted_id)}), 201

    else:
        return jsonify({"error": "User already exists"}), 400


@app.route("/log-in", methods=["GET", "POST"])
def login():
    email = request.args.get("email")
    password = request.args.get("password", "")
    credential_results = user_credentials.find_one({"email": email})

    if credential_results:
        hash_password = credential_results.get("password")
        if check_password_hash(hash_password, password):
            access_token = create_access_token(identity=email)
            return jsonify(access_token=access_token)
    return jsonify({"error": "Invalid email or password"}), 401

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/get-user", methods=["GET"])
@jwt_required()
def getUser():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run(debug=True)
