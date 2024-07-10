from flask import jsonify, request
from db import db
from utils import *
from models import *
from config import USERNAME, PASSWORD


def login():
    try:
        data = request.get_json()
        
        if not (("username" in data) and ("password" in data)):
            {'error': 'missing username or password'}
            return jsonify({'error': 'missing username or password'}), 400
        
        
        if (data['username']!=USERNAME or data['password']!=PASSWORD):
            
            return jsonify({'error': 'wrong credentials'}), 401
        
        token = {
            "token": generate_token(USERNAME)
        }
        
        return jsonify(token)
    
    except Exception as e:
        return internal_server_error(e)