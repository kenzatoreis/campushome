from flask import Blueprint, jsonify
from models import Student, db

storage = Blueprint('storage', __name__)