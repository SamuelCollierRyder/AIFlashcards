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

bp = Blueprint("jwt", __name__, url_prefix="/jwt")

@bp.route("/refresh-token", methods=["GET"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token), 200

@bp.route("/get-user", methods=["GET"])
@jwt_required()
def getUser():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
