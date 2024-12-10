from flask import Blueprint, jsonify, request
from models import Student, db, Booking

booking_bp = Blueprint('bookingrecord', __name__)

@booking_bp.route('/api/book', methods=['POST'])
def book_room():
    data = request.get_json()
    
    # Extract data from the request
    student_id = data.get('student_id')
    room_numb = data.get('room_numb')
    bldg_id = data.get('bldg_id')
    
    if not all([student_id, room_numb, bldg_id]):
        return jsonify({'error': 'Missing data'}), 400
    
    

    # Create a new booking record
    new_booking = Booking(student_id=student_id, room_numb=room_numb, bldg_id=bldg_id)
    
    try:
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({'message': 'Booking successful'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500