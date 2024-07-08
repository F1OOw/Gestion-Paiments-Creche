from flask import jsonify,request
from flask.blueprints import Blueprint
from models import *
from utils import *
from controllers.enfant_controller import *
from controllers.saison_controller import *
from db import db
import sys

routes = Blueprint("routes",__name__)

@routes.route('/api/enfants', methods=['GET',"POST"])
def handler1():
    if request.method == 'GET':
        return get_enfants()
    else:
        return add_enfant()

@routes.route("/api/enfants/<int:id>",methods=['GET','DELETE','PUT'])
def handler2(id):
    if request.method == 'GET':
        return get_enfant(id)
    elif request.method == 'DELETE':
        return delete_enfant(id)
    else:
        return update_enfant(id)

@routes.route("/api/saison",methods=['GET','POST','PUT'])
def handler3():
    if request.method=='GET':
        return get_current_saison()
    elif request.method=='PUT':
        return update_current_saison()
    else:
        return create_saison()

@routes.route("/api/saison/<int:id>",methods=['DELETE'])
def handler4(id):
    return delete_saison(id)