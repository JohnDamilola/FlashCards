from flask import Blueprint, jsonify
from flask import current_app as app
from flask_cors import cross_origin
from flask import request
import sys
sys.path.append("..")
#from .. import firebase
from __init__ import firebase

auth_bp = Blueprint(
    'auth_bp', __name__
)

auth = firebase.auth()

@auth_bp.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def index():
    return "Hello"

@auth_bp.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
def signup():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
    
        user = auth.create_user_with_email_and_password(email, password)
        return jsonify(
            user = user,
            message = 'Registered Successfully',
            status = 201
        )
    except:
        return jsonify(
            message = 'Registration Failed',
            status = 400
        )

@auth_bp.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        
        user = auth.sign_in_with_email_and_password(email, password)
        return jsonify(
            user = user,
            message = 'Login Successful',
            status = 201
        )
    except:
        return jsonify(
            message = 'Login Failed',
            status = 400
        )

if __name__ == '__main__':
    app.debug = True
    app.run()
