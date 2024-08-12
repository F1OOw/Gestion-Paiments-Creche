from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import *
from routes import routes
from db import db

# Initialize the app and set configuration
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///./data.db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    app.register_blueprint(routes, url_prefix='')
    return app 


if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        db.create_all()    
    
    app.run(debug=True, host="0.0.0.0", port=8000)