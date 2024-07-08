from flask import jsonify, request
from db import db
from utils import *
from models import *
from datetime import datetime

def get_enfants():
    try:
        enfants = db.session.query(Enfants).all()
        result = [
            jsonify_alchemy(en) for en in enfants
        ]
        return jsonify(result)
    
    except Exception as e :
        return internal_server_error(e)


def add_enfant():
    try:
        data = request.get_json()
        new_enfant = Enfants(
            nom=data['nom'],
            prenom=data['prenom'],
            date_naissance=datetime.strptime(data['date_naissance'], '%d/%m/%Y'),
            nom_tuteur=data['nom_tuteur'],
            prenom_tuteur=data['prenom_tuteur'],
            tel_tuteur=data['tel_tuteur'],
            email_tuteur=data['email_tuteur']
        )
        
        db.session.add(new_enfant)
        db.session.commit()
        return jsonify_alchemy(new_enfant), 201
    
    except Exception as e:
        return internal_server_error(e)


def get_enfant(id):
    try:
        enfant = db.session.query(Enfants).get_or_404(id)
        return jsonify_alchemy(enfant)
    
    except Exception as e:
        return internal_server_error(e)

def delete_enfant(id):
    try:
        enfant = db.session.query(Enfants).get_or_404(id)
        db.session.delete(enfant)
        db.session.commit()
        return deleted_message()
    except Exception as e:
        return internal_server_error(e)

def update_enfant(id):
    try:
        data = request.get_json()
        enfant = Enfants.query.get_or_404(id)
        
        enfant.nom = data.get('nom', enfant.nom)
        enfant.prenom = data.get('prenom', enfant.prenom)
        enfant.date_naissance = datetime.strptime(data['date_naissance'], '%d/%m/%Y')
        enfant.nom_tuteur = data.get('nom_tuteur', enfant.nom_tuteur)
        enfant.prenom_tuteur = data.get('prenom_tuteur', enfant.prenom_tuteur)
        enfant.tel_tuteur = data.get('tel_tuteur', enfant.tel_tuteur)
        enfant.email_tuteur = data.get('email_tuteur', enfant.email_tuteur)
        db.session.commit()
        
        return jsonify_alchemy(enfant)
    
    except Exception as e:
        return internal_server_error(e)
