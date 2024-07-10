from flask import request
from flask.blueprints import Blueprint
from models import *
from utils import *
from controllers.enfant_controller import *
from controllers.saison_controller import *
from controllers.paiements_controller import *
from controllers.archive_controller import *
from controllers.login_controller import *

from db import db

routes = Blueprint("routes",__name__)

@routes.route('/api/enfants', methods=['GET',"POST"])
@token_required
def handler1():
    if request.method == 'GET':
        return get_enfants()
    else:
        return add_enfant()

@routes.route("/api/enfants/<int:id>",methods=['GET','DELETE','PUT'])
@token_required
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
@token_required
def handler4(id):
    return delete_saison(id)

@routes.route("/api/saison/enfants",methods=['GET'])
@token_required
def handler5():
    return get_saison_enfants()

@routes.route("/api/saison/enfants/<int:id>",methods=['GET',"POST",'PUT','DELETE'])
@token_required
def handler6(id):
    if request.method=='POST':
        return enroll_enfant_saison(id)
    elif request.method == 'GET':
        return get_enfant_saison(id)
    elif request.method == 'DELETE':
        return delete_enfant_saison(id)
    else:
        return update_enfant_saison(id)

@routes.route('/api/saison/paiements', methods=['POST'])
@token_required
def handler7():
    return get_unpaid_enfants()

@routes.route('/api/saison/paiements/<int:id>', methods=['GET',"POST"])
@token_required
def handler8(id):
    if request.method == "GET":
        return get_enfant_paiements(id)
    else:
        return update_paiement(id)

@routes.route("/api/saison/<int:id>/archive",methods=['GET'])
@token_required
def handler9(id):
    return archive_saison(id)


@routes.route("/api/archives",methods=['GET'])
@token_required
def handler10():
    return get_archives()

@routes.route("/api/archives/<int:id>",methods=['GET'])
@token_required
def handler11(id):
    return download_archive(id)

@routes.route('/api/auth/login', methods=["POST"])
def handler12():
    return login()