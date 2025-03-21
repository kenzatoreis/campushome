from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from models import db, reset_student_id_sequence
from routes.auth import auth_bp
from routes.buildingData import building
from routes.roomData import room
from routes.storage import storage
from routes.bookingrecord import booking_bp
from routes.studentsInfo import student_bp
from routes.bookingrequest import request_bp
from routes.buildings import buildings_bp
from routes.preregistration import preregistration_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(building)
app.register_blueprint(room)
app.register_blueprint(student_bp)
app.register_blueprint(booking_bp)
app.register_blueprint(request_bp)
app.register_blueprint(buildings_bp)
app.register_blueprint(preregistration_bp)



with app.app_context():
    db.create_all()
    reset_student_id_sequence()

if __name__ == '__main__':
    app.run(debug=True)
