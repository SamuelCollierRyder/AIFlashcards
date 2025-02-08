from flask import Blueprint, request, jsonify
from flask_app.db import get_db
from werkzeug.security import generate_password_hash, check_password_hash

bp = Blueprint("auth", __name__, url_prefix="/auth")


@bp.route("/test")
def test():
    db = get_db()
    try:
        db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)", ("sam", "qwe")
        )
        db.commit()
    except db.IntegrityError:
        return ":("
    return ":)"


@bp.route("/signup", methods=["POST"])
def signup():
    request_data = request.get_json()
    email = request_data.get("email")
    password = request_data.get("password")
    hashed_password = generate_password_hash(password)
    db = get_db()
    try:
        db.execute(
            "INSERT INTO user (email, password) VALUES (?, ?)", (email, hashed_password)
        )
        db.commit()
        print("qwe")
        return jsonify({"success": "Sign up successful"}), 201

    except db.IntegrityError:
        return jsonify({"error": "User already exists"}), 400

    except Exception as e:
        print(e)
        return jsonify({"error": "Unknown error"}), 500
