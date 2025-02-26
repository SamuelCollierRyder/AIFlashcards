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
                "role": "user",
                "content": f"""You are a bot for a flashcard app, create flashcards with back and 
                                front and back side, it should be formatted as a JSON in the following
                                way [{{'question': 'question 1', 'answer': 'answer1'}}, {{'question': "question 2", 'answer' : 'answer2'}}...].
                                Convert the following text into flashcards: {card_info}""",
            }
        ],
        model="gpt-4",
    )
    answer = chat_completion.choices[0].message.content
    try:
        json_answer = json.loads(answer)
        return jsonify(json_answer), 200
    except Exception as e:
        return jsonify({"error": "Something went wrong"}), 400


@bp.route("/create-cards-from-topic", methods=["POST"])
@jwt_required()
def create_cards_from_topic():
    request_data = request.get_json()
    card_info = request_data.get("topic")
    chat_completion = open_ai_client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"""You are a bot for a flashcard app, create flashcards with back and 
                                front and back side, it should be formatted as a JSON in the following
                                way [{{'question': 'question 1', 'answer': 'answer1'}}, {{'question': "question 2", 'answer' : 'answer2'}}...].
                                Take the following topic and convert it into flashcards: {card_info}""",
            }
        ],
        model="gpt-4",
    )
    answer = chat_completion.choices[0].message.content
    try:
        json_answer = json.loads(answer)
        return jsonify(json_answer), 200

    except Exception as e:
        return jsonify({"error": e}), 400
