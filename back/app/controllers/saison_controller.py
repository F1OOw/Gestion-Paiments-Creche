from flask import jsonify, request
from db import db
from utils import *
from models import *
from datetime import datetime


def get_current_saison():
    try:
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        
        return jsonify_alchemy(saison)
    except Exception as e:
        return internal_server_error(e)

def update_current_saison():
    try:
        data = request.get_json()
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        saison.date_debut = datetime.strptime(data['date_debut'], '%d-%m-%Y')
        saison.date_fin = datetime.strptime(data['date_fin'], '%d-%m-%Y')
        db.session.commit()

        return jsonify_alchemy(saison)
    
    except Exception as e:
        return internal_server_error(e)

def create_saison():
    try:
        all_saisons = db.session.query(Saisons).filter_by(actuelle=True).all()
        for s in all_saisons:
            s.actuelle=False
        
        
        data = request.get_json()
        date_debut=datetime.strptime(data['date_debut'], '%d-%m-%Y')
        date_fin=datetime.strptime(data['date_fin'], '%d-%m-%Y')
        
        if (date_debut>= date_fin):
            return jsonify({'error': 'Incoherent dates'}), 400
        
        saison = Saisons(
            date_debut=datetime.strptime(data['date_debut'], '%d-%m-%Y'),
            date_fin=datetime.strptime(data['date_fin'], '%d-%m-%Y'),
            actuelle=True
        )
        
        
        
        db.session.add(saison)
        db.session.commit()
        return jsonify_alchemy(saison), 201
    
    except Exception as e:
        return internal_server_error(e)

def delete_saison(id):
    try:
        saison = db.session.query(Saisons).get_or_404(id)
        db.session.delete(saison)
        db.session.commit()
        return deleted_message()
    except Exception as e:
        return internal_server_error(e)


def get_saison_enfants():
    try:
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        inscriptions = Inscriptions.query.filter_by(id_saison=saison.id).all()
        result = [
            jsonify_alchemy(s) for s in inscriptions
        ]
        return jsonify(result)
    
    except Exception as e:
        return internal_server_error(e)

def enroll_enfant_saison(id_enfant):
    try:
        data = request.get_json()
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        new_inscription = Inscriptions(
            id_saison=saison.id,
            id_enfant=id_enfant,
            groupe=data['groupe'],
            transport=data['transport']
        )
        db.session.add(new_inscription)
        db.session.commit()
        return jsonify_alchemy(new_inscription)
    
    except Exception as e:
        return internal_server_error(e)

def get_enfant_saison(id_enfant):
    try:
        
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        inscription = db.session.query(Inscriptions).filter_by(id_saison=saison.id, id_enfant=id_enfant).first_or_404()
        
        enfant = db.session.query(Enfants).get_or_404(id_enfant)
        
        result = jsonify_alchemy(enfant)
        result['groupe'] =  inscription.groupe
        result['transport'] =  inscription.transport
        result['id_saison'] =  inscription.id_saison
        
        return result
    except Exception as e:
        return internal_server_error(e)

def delete_enfant_saison(id_enfant):
    try:
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        inscription = db.session.query(Inscriptions).filter_by(id_saison=saison.id, id_enfant=id_enfant).first_or_404()
        db.session.delete(inscription)
        db.session.commit()
        return deleted_message()
    
    except Exception as e:
        return internal_server_error(e)