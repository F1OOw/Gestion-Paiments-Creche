from flask import jsonify, request
from db import db
from utils import *
from models import *
from datetime import datetime

def get_unpaid_enfants():
    try:
        data = request.get_json()
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        paiements = Paiements.query.filter_by(id_saison=saison.id, mois=data['mois'], paye=False).all()
        
        result = []
        
        for paiement in paiements:
            enfant = jsonify_alchemy(db.session.query(Enfants).filter_by(id=paiement.id_enfant).first())
            
            insc = db.session.query(Inscriptions).filter_by(id_enfant=paiement.id_enfant,id_saison=paiement.id_saison).first()
            
            enfant['id_saison'] = paiement.id_saison
            enfant['groupe'] = insc.groupe
            enfant['transport'] = insc.transport
            
            result.append(enfant)
        
        return jsonify(result)
    
    except Exception as e:
        return internal_server_error(e)

def get_enfant_paiements(id_enfant):
    try:
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        paiements = db.session.query(Paiements).filter_by(id_saison=saison.id, id_enfant=id_enfant).all()
        
        result = {paiement.mois: paiement.paye for paiement in paiements}
        
        return jsonify(result)
    except Exception as e:
        return internal_server_error(e)


def update_paiement(id_enfant):
    try:
        data = request.get_json()
        mois = data['mois']
        saison = db.session.query(Saisons).filter_by(actuelle=True).first()
        if not saison:
            return jsonify({'error': 'No current season found'}), 404
        
        paiement = db.session.query(Paiements).filter_by(id_saison=saison.id, id_enfant=id_enfant, mois=mois).first_or_404()
        
        paiement.paye = not (paiement.paye)
        
        db.session.commit()
        
        return jsonify({mois: paiement.paye})
    except Exception as e:
        return internal_server_error(e)