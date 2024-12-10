from flask import Flask, jsonify, Blueprint

from models import Building, Room, db

room = Blueprint('roomData', __name__)

@room.route('/api/roomdata', methods=['GET'])
def get_room_data():
    rooms = Room.query.all()
    data = [
            {
                'Room_numb': room.Room_numb,
                'Bldg_id': room.Bldg_id,
                'Room_type': room.Room_type,
                'Status': room.Status,
                'Occupancy': room.Occupancy,
            }
            for room in rooms
        ]
    return jsonify(data)