from flask import Flask, jsonify, Blueprint, request
from models import Booking, Student, db

request_bp = Blueprint('bookingrequest', __name__)

@request_bp.route('/api/requestinfo', methods=['GET'])
def get_request_data():
    try:
        requests = Booking.query.all()
        data = [
            {
                'booking_id': request.booking_id, 
                'student_id': request.student_id,
                'room_numb': request.room_numb,
                'bldg_id': request.bldg_id,
            }
            for request in requests
        ]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@request_bp.route('/api/acceptrequest/<int:booking_id>', methods=['POST'])
def accept_request(booking_id):
    try:
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404

        # Assign the requested room to the student
        student = Student.query.get(booking.student_id)
        if not student:
            return jsonify({'error': 'Student not found'}), 404

        student.Room_id = booking.room_numb
        student.Bldg_id = booking.bldg_id

        db.session.delete(booking)
        db.session.commit()
        return jsonify({'message': 'Room assignment successful'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@request_bp.route('/api/rejectrequest/<int:booking_id>', methods=['POST'])
def reject_request(booking_id):
    try:
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404

        # Simply delete the booking request from the database
        db.session.delete(booking)
        db.session.commit()

        return jsonify({'message': 'Booking request rejected and removed from the system'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

