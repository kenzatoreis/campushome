from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db, reset_student_id_sequence
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(auth_bp)

with app.app_context():
    db.create_all()
    reset_student_id_sequence()

if __name__ == '__main__':
    app.run(debug=True)
