import json
from flask import Flask, jsonify, session
from bson import json_util
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

with open("../secrets.json") as f:
    data = json.load(f)
    uri = data["mongodb_uri"]

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
collection = client.flashCards.flashCards

app = Flask(__name__)

@app.route("/", methods=["GET"])
def hello_world():
    results = list(collection.find())
    
    # Use json_util to convert MongoDB data to JSON
    json_data = json.loads(json_util.dumps(results))
    
    # Return results as JSON
    return jsonify(json_data)

@app.route("/add", methods=["GET", "POST"])
def hello_worl():
    result = collection.insert_one({'question': "What is the capital of France?", 'answer': "Paris"})
    return jsonify({"inserted_id": str(result.inserted_id)}), 201



if __name__ == "__main__":
    app.run(debug=True)
