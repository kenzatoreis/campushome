from flask import Blueprint, jsonify, request
from models import Building, db


buildings_bp = Blueprint('buildings', __name__)

@buildings_bp.route('/api/buildings', methods=['GET'])
def get_buildings():
    gender = request.args.get('gender')
    if gender:
        buildings = Building.query.filter_by(Gender_residence=gender).all()
    else:
        buildings = Building.query.all()

    result = [{"bldg_id": b.Bldg_id, "name": f"Building {b.Bldg_id}"} for b in buildings]
    return jsonify(result)
