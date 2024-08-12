from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

# Initialize the app and set configuration
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./data.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database
    db = SQLAlchemy()
    db.init_app(app)

    # Create a test route to check the database connection
    @app.route('/test_db')
    def test_db():
        try:
            # Execute a simple query to test the connection
            with db.engine.connect() as connection:
                result = connection.execute(text("SELECT 1"))
                result_value = result.scalar()
                return f"Connection successful! Result: {result_value}", 200
        except Exception as e:
            return f"Connection failed: {str(e)}", 500

    return app 

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port=9000)