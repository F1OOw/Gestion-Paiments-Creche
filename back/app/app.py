from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import *
from routes import routes
from db import db

# Initialize the app and set configuration
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    app.register_blueprint(routes, url_prefix='')
    return app 

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=8000)