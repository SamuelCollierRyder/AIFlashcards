from datetime import datetime, timedelta
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
@jwt_required()
def add_card():
    db = get_db()
    request_data = request.get_json()
    question = request_data.get("question")
    answer = request_data.get("answer")
    user_email = get_jwt_identity()
    try:
        db.execute(
            "INSERT INTO card (user_email, question, answer, timestamp) VALUES (?, ?, ?, ?)",
            (user_email, question, answer, datetime.now()),
        )
        db.commit()
        return jsonify({"success": "Card added"}), 201

    except Exception as e:
        return jsonify({"error": "Unknown error"}), 500


@bp.route("/get-all", methods=["GET"])
@jwt_required()
def get_all():
    db = get_db()
    user_email = get_jwt_identity()
    cards = db.execute(
        "SELECT * FROM card WHERE user_email = ?", (user_email,)
    ).fetchall()
    cards = [dict(card) for card in cards]
    return jsonify(cards), 200


@bp.route("/get-current", methods=["GET"])
@jwt_required()
def get_current():
    db = get_db()
    current_time = datetime.now()
    user_email = get_jwt_identity()
    cards = db.execute(
        "SELECT * FROM card WHERE user_email = ? AND timestamp < ?",
        (user_email, current_time),
    ).fetchall()
    cards = [dict(card) for card in cards]
    return jsonify(cards), 200


@bp.route("/delete", methods=["DELETE"])
@jwt_required()
def delete_card():
    db = get_db()
    request_data = request.get_json()
    card_id = request_data.get("id")
    user_email = get_jwt_identity()

    try:
        db.execute(
            "DELETE FROM card WHERE id = ? AND user_email = ?", (card_id, user_email)
        )
        db.commit()
        return jsonify({"success": "Card deleted"}), 200

    except Exception:
        return jsonify({"error": "Unknown error"}), 500


def calculate_interval(ef, interval):
    if interval == 1:
        return 1
    elif interval == 2:
        return 6
    else:
        return calculate_interval(ef, interval - 1) * ef


@bp.route("/update-time", methods=["GET", "POST"])
@jwt_required()
def update_time():
    db = get_db()
    request_data = request.get_json()
    card_id = request_data.get("id")
    difficulty = int(request_data.get("difficulty"))
    interval = calculate_interval(difficulty, 1)
    try:
        db.execute(
            "UPDATE card SET timestamp = ? WHERE id = ?",
            (datetime.now() + timedelta(days=interval), card_id),
        )
        db.commit()
        return jsonify({"success": "Time updated"}), 200

    except Exception:
        return jsonify({"error": "Unknown error"}), 500
