from flask import Flask, jsonify, Blueprint
from models import Building, Room, db

building = Blueprint('buildingData', __name__)

@building.route('/api/buildingdata', methods=['GET'])
def get_building_data():
    try:
        buildings = Building.query.all()
        data = [
            {
                'Bldg_id': building.Bldg_id,
                'Gender_residence': building.Gender_residence,
                'Total_rooms': building.Total_rooms,
            }
            for building in buildings
        ]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


