from flask import Blueprint, request, jsonify
from flask_app.db import get_db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
)

bp = Blueprint("auth", __name__, url_prefix="/auth")


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


@bp.route("/login", methods=["POST"])
def login():
    request_data = request.get_json()
    email = request_data.get("email")
    password = request_data.get("password")
    db = get_db()
    user = db.execute("SELECT * FROM user WHERE email = ?", (email,)).fetchone()

    if user is None:
        return jsonify({"error": "User does not exist"}), 400

    if check_password_hash(user["password"], password):
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200

    return jsonify({"error": "Incorrect password"}), 400
