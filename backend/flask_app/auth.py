from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from flask_app.db import get_db
bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/test')
def test():
    db = get_db()
    try:
        db.execute("INSERT INTO user (username, password) VALUES (?, ?)", ("sam", "qwe"))
        db.commit()
    except db.IntegrityError:
        return ":("
    return ":)"
