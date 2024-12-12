from flask import Blueprint, request, jsonify
from models import db, PreRegistration

preregistration_bp = Blueprint('preregistration', __name__)

@preregistration_bp.route('/api/pre_registration', methods=['POST'])
def pre_register():
    data = request.json
    try:
        preregistration = PreRegistration(
            Student_id=data['student_id'],
            Bldg_id=data['bldg_id'],
            Smoker=data['smoker'],
            SleepPreference=data['sleep_preference'],
            StudyPreference=data['study_preference'],
            PreferredRoommateID=data.get('preferred_roommate_id')
        )
        db.session.add(preregistration)
        db.session.commit()
        return jsonify({'message': 'Pre-registration created successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400