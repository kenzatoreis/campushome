from flask import Flask, jsonify, Blueprint
from models import Student, db

student_bp = Blueprint('studentsInfo', __name__)

@student_bp.route('/api/studentsinfo', methods=['GET'])
def get_student_data():
    try:
        students = Student.query.all()
        data = [
            {
                'Student_id': student.Student_id,
                'Username': student.Username,
                'Room_id': student.Room_id,
                'Bldg_id': student.Bldg_id,
                'Std_firstName': student.Std_firstName,
                'Std_lastName': student.Std_lastName,
                'Email': student.Email,
                'Phonenumber': student.Phonenumber,
                'Gender': student.Gender,
                'Std_type': student.Std_type,

            }
            for student in students
        ]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


