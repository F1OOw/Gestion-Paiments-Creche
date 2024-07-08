import sys
from models import *

def jsonify(object):   
    class_name = object.__class__.__name__
    class_defined_attributes = [key for key, value in globals()[class_name].__dict__.items() if not (callable(value) or key.startswith('__') or key.startswith('_'))]
        
    return {key:getattr(object,key) for key in class_defined_attributes}
    