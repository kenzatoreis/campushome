from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

db = SQLAlchemy()

class Building(db.Model):
    __tablename__ = 'Building'
    Bldg_id = db.Column(db.Integer, primary_key=True)
    Gender_residence = db.Column(db.String(10))
    Total_rooms = db.Column(db.Integer)
    
    # Relationships
    rooms = db.relationship('Room', backref='building', lazy=True)
    students = db.relationship('Student', backref='building', lazy=True)
    storages = db.relationship('Storage', backref='building', lazy=True)
    bookings = db.relationship('Booking', backref='building', lazy=True)


class Room(db.Model):
    __tablename__ = 'Room'
    
    Room_numb = db.Column(db.String, primary_key=True, nullable=False)
    Bldg_id = db.Column(db.Integer, db.ForeignKey('Building.Bldg_id'), primary_key=True, nullable=False)
    Room_type = db.Column(db.String(20))
    Status = db.Column(db.String(20))
    Occupancy = db.Column(db.Integer)
    
    # Relationships
    students = db.relationship('Student', backref='room', lazy=True)
    exchange_requests = db.relationship('ExchangeRequest', backref='current_room', lazy=True, foreign_keys='ExchangeRequest.Room_id')
    bookings = db.relationship('Booking', backref='room', lazy=True)


class Student(db.Model):
    __tablename__ = 'Student'
    Student_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Username = db.Column(db.String(50), nullable=False)
    Room_id = db.Column(db.String, db.ForeignKey('Room.Room_numb'), nullable=True)
    Bldg_id = db.Column(db.Integer, db.ForeignKey('Building.Bldg_id'), nullable=True)
    Std_firstName = db.Column(db.String(50), nullable=True)
    Std_lastName = db.Column(db.String(50), nullable=True)
    Email = db.Column(db.String(100), unique=True, nullable=False)
    Password = db.Column(db.String(225), nullable=False)
    Std_type = db.Column(db.String(20), nullable=True)
    Phonenumber = db.Column(db.String(15), nullable=False)
    Gender = db.Column(db.String(10))
    
    # Relationships
    bookings = db.relationship('Booking', backref='student', lazy=True)
    exchange_requests = db.relationship('ExchangeRequest', backref='student', lazy=True)


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


class ExchangeRequest(db.Model):
    __tablename__ = 'ExchangeRequest'
    Room_id = db.Column(db.String, db.ForeignKey('Room.Room_numb'), primary_key=True)
    Req_room = db.Column(db.String, primary_key=True)  # Match Room.Room_numb type
    Student_id = db.Column(db.Integer, db.ForeignKey('Student.Student_id'), nullable=False)
    RequestStatus = db.Column(db.String(20))


class Event(db.Model):
    __tablename__ = 'Event'
    Event_name = db.Column(db.String(100), primary_key=True)
    Event_date = db.Column(db.Date, primary_key=True)


class Booking(db.Model):
    __tablename__ = 'booking'
    booking_id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('Student.Student_id'), nullable=False)
    bldg_id = db.Column(db.Integer, db.ForeignKey('Building.Bldg_id'), nullable=False)
    room_numb = db.Column(db.String, db.ForeignKey('Room.Room_numb'), nullable=False)

def reset_student_id_sequence():
    db.session.execute(text('ALTER SEQUENCE "Student_new_Student_id_seq" RESTART WITH 10001'))  # Verify actual sequence name
    db.session.commit()
