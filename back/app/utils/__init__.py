import sys
from functools import wraps
import jwt
from flask import jsonify, request
from models import *
from config import *
from string import ascii_letters, digits
from datetime import datetime,time,date, timedelta,timezone
import random
import traceback

def jsonify_alchemy(object):   
    class_name = object.__class__.__name__
    class_defined_attributes = [key for key, value in globals()[class_name].__dict__.items() if not (callable(value) or key.startswith('__') or key.startswith('_'))]
    
    json = {}
    
    for key in class_defined_attributes:
        val = getattr(object,key)
        
        if isinstance(val,date):    
            val = datetime.strftime(val,'%Y-%m-%d')
            
        json[key] = val
            
    return json

def internal_server_error(e):
    print(str(e),file=sys.stderr)
    traceback.print_exc()
    return jsonify({'message': "Internal Server Error"}), 500

def controller_template(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        
        except Exception as e:
            return internal_server_error(e)
        
    return decorated

def deleted_message():
    return jsonify({"message": "Deleted succesfully"}), 200

def get_months(start_date,end_date):
    
    start = datetime.combine(start_date, time.min)
    end = datetime.combine(end_date, time.min)

    months = []
    while start <= end:
        months.append(start.month)
        
        if start.month == 12:
            start = datetime(start.year + 1, 1, 1)
        else:
            start = datetime(start.year, start.month + 1, 1)

    return months

def gen_random_file_name(length):
    return "".join([random.choice(ascii_letters+digits) for i in range(length)])

def extract_token(request):
    token = request.headers.get('Authorization')

    if not token:
        return None

    # Check if the token starts with 'Bearer ' and extract the token
    if 'Bearer ' in token:
        token = token.split('Bearer ')[1]
        return token
    
    return None

def decode_token(token):
    return jwt.decode(token, SECRET_KEY , algorithms="HS256")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token(request)
        
        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401

        try:
            data = decode_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        return f(*args, **kwargs)

    return decorated

def generate_token(username):
    token = jwt.encode(
        {
            'user': username,
            'exp': datetime.now(timezone.utc) + timedelta(hours=TOKEN_EXPIRATION_TIME)
        }, SECRET_KEY, 
        
        algorithm='HS256'
    )
    
    return token