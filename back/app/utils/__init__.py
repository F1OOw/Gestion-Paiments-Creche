import sys
from flask import jsonify
from models import *

def jsonify_alchemy(object):   
    class_name = object.__class__.__name__
    class_defined_attributes = [key for key, value in globals()[class_name].__dict__.items() if not (callable(value) or key.startswith('__') or key.startswith('_'))]
        
    return {key:getattr(object,key) for key in class_defined_attributes}

def internal_server_error(e):
    print(str(e),file=sys.stderr)
    return jsonify({'message': "Internal Server Error"}), 500

def deleted_message():
    return jsonify({"message": "Deleted succesfully"}), 200