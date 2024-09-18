import json
from flask import Flask, jsonify, session
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

with open("../secrets.json") as f:
    data = json.load(f)
    uri = data["mongodb_uri"]
    secret_key = data["secret_key"]
    jwt_secret_key = data["jwt_secret_key"]

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi("1"))
collection = client.flashCards.flashCards

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


@app.route("/login", methods=["GET", "POST"])
def login():
    access_token = create_access_token(identity="sam")
    return jsonify(access_token=access_token)


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


if __name__ == "__main__":
    app.run(debug=True)
