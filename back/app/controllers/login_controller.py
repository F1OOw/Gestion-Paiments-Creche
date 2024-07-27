from flask import jsonify, request
from db import db
from utils import *
from models import *
from config import USERNAME, PASSWORD

@controller_template
def login():
    data = request.get_json()
    
    if not (("username" in data) and ("password" in data)):
        return jsonify({'error': 'missing username or password'}), 400
    
    
    if (data['username']!=USERNAME or data['password']!=PASSWORD):
        
        return jsonify({'error': 'wrong credentials'}), 401
    
    token = {
        "token": generate_token(USERNAME)
    }
    
    return jsonify(token)