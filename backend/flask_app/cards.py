from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_app.db import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)

bp = Blueprint("cards", __name__, url_prefix="/cards")


@bp.route("/add", methods=["GET", "POST"])
# @jwt_required()
def add_card():
    db = get_db()
    request_data = request.get_json()
    question = request_data.get("question")
    answer = request_data.get("answer")
    # user_email = get_jwt_identity()
    user_email = "sam"
    try:
        db.execute(
            "INSERT INTO card (user_email, question, answer, timestamp) VALUES (?, ?, ?, ?)",
            (user_email, question, answer, datetime.now()),
        )
        db.commit()
        return jsonify({"success": "Card added"}), 201

    except Exception:
        return jsonify({"error": "Unknown error"}), 500

@bp.route("/get-all", methods=["GET"])
# @jwt_required()
def get_cards():
    db = get_db()
    # user_email = get_jwt_identity()
    user_email = "sam"
    cards = db.execute(
        "SELECT * FROM card WHERE user_email = ?", (user_email,)
    ).fetchall()
    cards = [dict(card) for card in cards]
    return jsonify(cards), 200
