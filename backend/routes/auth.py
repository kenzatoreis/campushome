from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from models import Student, db, Admin

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
    username = request.args.get('Username')
    password = request.args.get('Password')

    # Validate input
    if not username or not password:
        return jsonify({'error': 'Username and Password are required'}), 400

    # Check if the user is a student
    student = Student.query.filter_by(Username=username).first()
    if student and check_password_hash(student.Password, password):
        # Authentication successful for student
        
        return jsonify({
            'role': 'student',
            'message': 'Login successful',
            'Username': student.Username,
            'Student_id': student.Student_id,
            'Email': student.Email,
            'Gender': student.Gender,
            'Phonenumber': student.Phonenumber,
            'Std_type': student.Std_type,
            'Std_firstName': student.Std_firstName,
            'Std_lastName': student.Std_lastName,
            'Room_id': student.Room_id,
            'Bldg_id': student.Bldg_id,
        }), 200

    # Check if the user is an admin
    admin = Admin.query.filter_by(Username=username).first()
    admin2 = Admin.query.filter_by(Password=password).first()
    if admin and admin2:
        # Authentication successful for admin
        return jsonify({
            'role': 'admin',
            'message': 'Login successful',
            'Admin_id': admin.Admin_id,
            'Admin_firstname': admin.Admin_firstname,
            'Admin_lastname': admin.Admin_lastname,
            'Email': admin.Email,
            'Phone_num': admin.Phone_num,
        }), 200

    # Authentication failed
    return jsonify({'error': 'Invalid Username or Password'}), 401
