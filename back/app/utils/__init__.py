import sys
from flask import jsonify
from models import *
from string import ascii_letters, digits
from datetime import datetime,time
import random

def jsonify_alchemy(object):   
    class_name = object.__class__.__name__
    class_defined_attributes = [key for key, value in globals()[class_name].__dict__.items() if not (callable(value) or key.startswith('__') or key.startswith('_'))]
        
    return {key:getattr(object,key) for key in class_defined_attributes}

def internal_server_error(e):
    print(e,file=sys.stderr)
    return jsonify({'message': "Internal Server Error"}), 500

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