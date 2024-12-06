from flask_sqlalchemy import SQLAlchemy
import uuid
from sqlalchemy import text
db = SQLAlchemy()

class Building(db.Model):
    __tablename__ = 'Building'
    Bldg_id = db.Column(db.Integer, primary_key=True)
    Gender_residence = db.Column(db.String(10))
    Total_rooms = db.Column(db.Integer)


class Room(db.Model):
    __tablename__ = 'Room'
    Room_numb = db.Column(db.Integer, primary_key=True)
    Bldg_id = db.Column(db.Integer, db.ForeignKey('Building.Bldg_id'), nullable=False)
    Room_type = db.Column(db.String(20))
    Status = db.Column(db.String(20))
    building = db.relationship('Building', backref='rooms', lazy=True)


class Student(db.Model):
    __tablename__ = 'Student'
    Student_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Username = db.Column(db.String(50), nullable=False)
    Room_id = db.Column(db.Integer, db.ForeignKey('Room.Room_numb'), nullable=True)
    Bldg_id = db.Column(db.Integer, db.ForeignKey('Building.Bldg_id'), nullable=True)
    Std_firstName = db.Column(db.String(50), nullable=True)
    Std_lastName = db.Column(db.String(50), nullable=True)
    Email = db.Column(db.String(100), unique=True, nullable=False)
    Password = db.Column(db.String(225), nullable=False)
    Std_type = db.Column(db.String(20), nullable=True)
    Phonenumber = db.Column(db.String(15), nullable=False)
    Gender = db.Column(db.String(10))
    room = db.relationship('Room', backref='students', lazy=True)
    building = db.relationship('Building', backref='students', lazy=True)


class Admin(db.Model):
    __tablename__ = 'Admin'
    Admin_id = db.Column(db.Integer, primary_key=True)
    Admin_firstname = db.Column(db.String(50))
    Admin_lastname = db.Column(db.String(50))
    Email = db.Column(db.String(100), unique=True, nullable=False)
    Password = db.Column(db.String(100), nullable=False)
    Phone_num = db.Column(db.String(15))


class Storage(db.Model):
    __tablename__ = 'Storage'
    Storage_id = db.Column(db.Integer, primary_key=True)
    Bldg_id = db.Column(db.Integer, db.ForeignKey('Building.Bldg_id'), nullable=False)
    Occupancy = db.Column(db.Integer)
    building = db.relationship('Building', backref='storages', lazy=True)


class ExchangeRequest(db.Model):
    __tablename__ = 'ExchangeRequest'
    Room_id = db.Column(db.Integer, db.ForeignKey('Room.Room_numb'), primary_key=True)
    Req_room = db.Column(db.Integer, primary_key=True)
    Student_id = db.Column(db.Integer, db.ForeignKey('Student.Student_id'), nullable=False)
    RequestStatus = db.Column(db.String(20))
    room = db.relationship('Room', backref='exchange_requests', lazy=True)
    student = db.relationship('Student', backref='exchange_requests', lazy=True)


class Event(db.Model):
    __tablename__ = 'Event'
    Event_name = db.Column(db.String(100), primary_key=True)
    Event_date = db.Column(db.Date, primary_key=True)

def reset_student_id_sequence():
    db.session.execute(text('ALTER SEQUENCE "Student_new_Student_id_seq" RESTART WITH 10001'))
    db.session.commit()