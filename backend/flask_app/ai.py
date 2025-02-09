import os
from openai import OpenAI
from flask import Blueprint, request, jsonify
bp = Blueprint("ai", __name__, url_prefix="/ai")

open_ai_client = OpenAI(api_key=os.getenv("OPEN_AI_KEY"))

@bp.route("/get-answer", methods=["POST"])
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
