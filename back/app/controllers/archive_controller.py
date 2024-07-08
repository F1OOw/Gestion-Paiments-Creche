from flask import jsonify, request,send_file
from db import db
from config import months, ARCHIVE_FOLDER
from utils import *
from models import *
import csv

def archive_saison(saison_id):
    try:
        saison = db.session.query(Saisons).get_or_404(saison_id)
        inscriptions = db.session.query(Inscriptions).filter_by(id_saison=saison.id).all()
        

        saison_months = get_months(saison.date_debut, saison.date_fin)
        
        header = ['id', 'nom', 'prenom', 'date Naissance','nom_tuteur','prenom_tuteur','tel_tuteur'] + [ months[i] for i in saison_months]
        
        file = ARCHIVE_FOLDER
        file += gen_random_file_name(10)
        file += ".csv"
        
        with open(file,'w',newline='') as csvfile:
        
            writer = csv.writer(csvfile)
            writer.writerow(header)
            
            for inscription in inscriptions:
                enfant = db.session.query(Enfants).get(inscription.id_enfant)
                
                row = [inscription.id_enfant, enfant.nom, enfant.prenom,enfant.date_naissance.strftime('%d-%m-%Y'), enfant.nom_tuteur, enfant.prenom_tuteur, f"_{enfant.tel_tuteur}"]
                
                paiements = db.session.query(Paiements).filter_by(id_saison=saison.id,id_enfant=inscription.id_enfant).all()
                
                paiements_dict = {p.mois: p.paye for p in paiements}
                
                for month in saison_months:
                    row.append(paiements_dict.get(month, False))
                
                writer.writerow(row)
        
        archive = Archives(
            date_debut=saison.date_debut,
            date_fin=saison.date_fin,
            fichier=file.split("/")[2].split('.')[0]
        )
        
        db.session.add(archive)
        
        
        # db.session.delete(saison)
        
        db.session.commit()
        
        return jsonify_alchemy(archive),201

    
    except Exception as e:
        internal_server_error(e)

def get_archives():
    try:
        archives = db.session.query(Archives).all()
        result =  [ jsonify_alchemy(a) for a in archives ]
        return jsonify(result)
    except Exception as e:
        internal_server_error(e)

def download_archive(id):
    try:
        archive = db.session.query(Archives).filter_by(id=id).first()
        return send_file(ARCHIVE_FOLDER+f"{archive.fichier}.csv",as_attachment=True)
    
    except Exception as e:
        internal_server_error(e)