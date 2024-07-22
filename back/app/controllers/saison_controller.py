from flask import jsonify, request
from db import db
from utils import *
from models import *
from config import NB_GROUPES
from datetime import datetime

@controller_template
def get_current_saison():
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    
    return jsonify_alchemy(saison)

@controller_template
def update_current_saison():
    data = request.get_json()
    
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    data['date_debut'] = datetime.fromtimestamp(data['date_debut']//1000)
    data['date_fin'] = datetime.fromtimestamp(data['date_fin']//1000)
    
    saison.date_debut = datetime.strptime(data['date_debut'], '%Y-%m-%d')
    saison.date_fin = datetime.strptime(data['date_fin'], '%Y-%m-%d')
    db.session.commit()

    return jsonify_alchemy(saison)

@controller_template
def create_saison():
    all_saisons = db.session.query(Saisons).filter_by(actuelle=True).all()
    for s in all_saisons:
        s.actuelle=False
    
    
    data = request.get_json()
    data['date_debut'] = datetime.fromtimestamp(data['date_debut']//1000)
    data['date_fin'] = datetime.fromtimestamp(data['date_fin']//1000)
    
    date_debut=datetime.strptime(data['date_debut'], '%Y-%m-%d')
    date_fin=datetime.strptime(data['date_fin'], '%Y-%m-%d')
    
    if (date_debut>= date_fin):
        return jsonify({'error': 'Incoherent dates'}), 400
    
    saison = Saisons(
        date_debut=datetime.strptime(data['date_debut'], '%Y-%m-%d'),
        date_fin=datetime.strptime(data['date_fin'], '%Y-%m-%d'),
        actuelle=True
    )
    
    
    
    db.session.add(saison)
    db.session.commit()
    return jsonify_alchemy(saison), 201

@controller_template
def delete_saison(id):
    saison = db.session.query(Saisons).get_or_404(id)
    db.session.delete(saison)
    db.session.commit()
    return deleted_message()

@controller_template
def get_saison_enfants():
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    inscriptions = Inscriptions.query.filter_by(id_saison=saison.id).all()
    
    result=[]
    for s in inscriptions:
        enfant = jsonify_alchemy(db.session.query(Enfants).filter_by(id=s.id_enfant).first())
        enfant['id_saison'] = s.id_saison
        enfant['groupe'] = s.groupe
        enfant['transport'] = s.transport
        
        result.append(enfant)
        
    return jsonify(result)

def init_paiements(id_enfant,id_saison):
    saison = db.session.query(Saisons).filter_by(id=id_saison).first()
    
    for m in get_months(saison.date_debut,saison.date_fin):
        p = Paiements(
            id_saison=id_saison,
            id_enfant=id_enfant,
            mois=m,
            paye=False
        )
        
        db.session.add(p)
    
    db.session.commit()
    
@controller_template
def enroll_enfant_saison(id_enfant):
    data = request.get_json()
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    enfant = db.session.query(Inscriptions).filter_by(id_saison=saison.id,id_enfant=id_enfant).first()
    
    if enfant:
        return jsonify({'error': 'Enfant already enrolled'}), 409
    
    new_inscription = Inscriptions(
        id_saison=saison.id,
        id_enfant=id_enfant,
        groupe=data['groupe'],
        transport=data['transport']
    )
    db.session.add(new_inscription)
    
    init_paiements(id_enfant,saison.id)
    
    db.session.commit()
    
    return jsonify_alchemy(new_inscription)

@controller_template
def get_enfant_saison(id_enfant):    
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

@controller_template
def delete_enfant_saison(id_enfant):
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    inscription = db.session.query(Inscriptions).filter_by(id_saison=saison.id, id_enfant=id_enfant).first_or_404()
    db.session.delete(inscription)
    db.session.commit()
    return deleted_message()

@controller_template
def update_enfant_saison(id_enfant):
    data = request.get_json()
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    inscription = db.session.query(Inscriptions).filter_by(id_saison=saison.id, id_enfant=id_enfant).first_or_404()
    inscription.groupe = data['groupe']
    inscription.transport = data['transport']
    db.session.commit()
    
    return jsonify_alchemy(inscription)

@controller_template
def get_current_saison_months():
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    if not saison:
        return jsonify({'error': 'No current season found'}), 404
    
    return {"mois": get_months(saison.date_debut, saison.date_fin)}

@controller_template
def get_current_saison_groupes():
    return {"groupes": list(range(1,NB_GROUPES+1))}