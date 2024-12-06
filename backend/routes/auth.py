from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import Student, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    current_app.logger.info(f"Received data: {data}")

    required_fields = ['Username', 'Gender', 'Email', 'Phonenumber', 'Password']
    for field in required_fields:
        if field not in data:
            current_app.logger.error(f"Validation failed: Missing field {field}")
            return jsonify({'error': f'Missing field {field}'}), 400

    if not data['Username']:
        return jsonify({'error': 'Username is required'}), 400

    if '@' not in data['Email']:
        return jsonify({'error': 'Invalid Email'}), 400

    if len(data['Phonenumber']) < 10:
        return jsonify({'error': 'Invalid Phone Number'}), 400

    # Extract data
    username = data['Username']
    email = data['Email']
    password = data['Password']
    hashed_password = generate_password_hash(password)

    # Check for existing student
    existing_student = Student.query.filter(
        (Student.Username == username) | (Student.Email == email)
    ).first()

    if existing_student:
        return jsonify({'error': 'Student already exists'}), 400

    # Create new student
    new_student = Student(
        Username=username,
        Gender=data['Gender'],
        Email=email,
        Phonenumber=data['Phonenumber'],
        Password=hashed_password
    )

    try:
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Signup successful'}), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Database error: {e}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
    

@auth_bp.route('/api/signin', methods=['GET'])
def signin():
    # Extract query parameters
    student_id = request.args.get('Student_id')
    password = request.args.get('Password')

    # Validate input
    if not student_id or not password:
        return jsonify({'error': 'Student ID and Password are required'}), 400

    # Query the database for the student
    student = Student.query.filter_by(Student_id=student_id).first()

    # Check if student exists
    if not student:
        return jsonify({'error': 'Invalid Student ID or Password'}), 401

    # Verify the password
    if not check_password_hash(student.Password, password):
        return jsonify({'error': 'Invalid Student ID or Password'}), 401

    # Authentication successful
    return jsonify({
        'message': 'Login successful',
        'Student_id': student.Student_id,
        'Username': student.Username,
    }), 200
