import os
import json
from openai import OpenAI
from flask import Blueprint, request, jsonify

bp = Blueprint("ai", __name__, url_prefix="/ai")
from flask_jwt_extended import (
    jwt_required,
)

open_ai_client = OpenAI(api_key=os.getenv("OPEN_AI_KEY"))


@bp.route("/get-answer", methods=["POST"])
@jwt_required()
def get_answer():
    request_data = request.get_json()
    question = request_data.get("question")
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


@bp.route("/create-cards-from-file", methods=["POST"])
@jwt_required()
def create_cards_from_file():
    request_data = request.get_json()
    card_info = request_data.get("text")
    chat_completion = open_ai_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a bot for a flashcard app. Your response must be a valid JSON array with no extra text. "
                    "Format: [{'question': 'question 1', 'answer': 'answer1'}, {'question': 'question 2', 'answer': 'answer2'}]. "
                    "Only return the JSON. No explanations. Text to summarize: "
                    + card_info
                ),
            }
        ],
        model="gpt-4o",
    )
    answer = chat_completion.choices[0].message.content.strip()
    try:
        json_answer = json.loads(answer)

    except json.JSONDecodeError:
        return (
            jsonify(
                {"error": "Invalid JSON response from OpenAI", "raw_response": answer}
            ),
            500,
        )

    return jsonify(json_answer), 200


@bp.route("/create-cards-from-topic", methods=["POST"])
@jwt_required()
def create_cards_from_topic():
    request_data = request.get_json()
    card_info = request_data.get("topic")
    chat_completion = open_ai_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a bot for a flashcard app. Your response must be a valid JSON array with no extra text. "
                    "Format: [{'question': 'question 1', 'answer': 'answer1'}, {'question': 'question 2', 'answer': 'answer2'}]. "
                    "Only return the JSON. No explanations. Topic: " + card_info
                ),
            }
        ],
        model="gpt-4o",
    )
    answer = chat_completion.choices[0].message.content.strip()
    try:
        json_answer = json.loads(answer)

    except json.JSONDecodeError:
        return (
            jsonify(
                {"error": "Invalid JSON response from OpenAI", "raw_response": answer}
            ),
            500,
        )

    return jsonify(json_answer), 200
