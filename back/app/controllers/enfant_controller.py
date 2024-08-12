from flask import jsonify, request
from db import db
from utils import *
from models import *
from datetime import datetime

@controller_template
def get_enfants():
    enfants = db.session.query(Enfants).all()
    result = [
        jsonify_alchemy(en) for en in enfants
    ]

    return jsonify(result)
    

@controller_template
def add_enfant():
    data = request.get_json()
    new_enfant = Enfants(
        nom=data['nom'],
        prenom=data['prenom'],
        date_naissance=datetime.strptime(data['date_naissance'], "%Y-%m-%d").date(),
        nom_tuteur=data['nom_tuteur'],
        prenom_tuteur=data['prenom_tuteur'],
        tel_tuteur=data['tel_tuteur'],
        email_tuteur=data['email_tuteur'],
        adresse=data['adresse']
    )
    
    db.session.add(new_enfant)
    db.session.commit()
    return jsonify_alchemy(new_enfant), 201
    

@controller_template
def get_enfant(id):
    enfant = db.session.query(Enfants).get_or_404(id)
    return jsonify_alchemy(enfant)
    
@controller_template
def delete_enfant(id):
    enfant = db.session.query(Enfants).get_or_404(id)
    db.session.delete(enfant)
    db.session.commit()
    return deleted_message()

@controller_template
def update_enfant(id):
    data = request.get_json()
    
    enfant = db.session.query(Enfants).get_or_404(id)
    enfant.nom = data['nom']
    enfant.prenom = data['prenom']
    enfant.date_naissance = datetime.strptime(data['date_naissance'], '%Y-%m-%d')
    enfant.nom_tuteur = data['nom_tuteur']
    enfant.prenom_tuteur = data['prenom_tuteur']
    enfant.tel_tuteur = data['tel_tuteur']
    enfant.email_tuteur = data['email_tuteur']
    enfant.adresse = data['adresse']
    
    db.session.commit()
    
    return jsonify_alchemy(enfant)
    
