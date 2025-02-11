import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flask_app.sqlite'),
    )
    CORS(app)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    load_dotenv()
    jwt_secret_key = os.getenv("JWT_SECRET_KEY")

    app.config["JWT_SECRET_KEY"] = jwt_secret_key
    jwt = JWTManager(app)

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    from . import cards
    app.register_blueprint(cards.bp)

    from . import jwt
    app.register_blueprint(jwt.bp)

    from . import ai
    app.register_blueprint(ai.bp)
    return app
