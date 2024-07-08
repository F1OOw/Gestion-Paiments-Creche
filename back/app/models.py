from db import db
import sys

class Enfants(db.Model):
    __tablename__ = 'Enfants'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nom = db.Column(db.String(255), nullable=False)
    prenom = db.Column(db.String(255), nullable=False)
    date_naissance = db.Column(db.Date, nullable=False)
    nom_tuteur = db.Column(db.String(255), nullable=False)
    prenom_tuteur = db.Column(db.String(255), nullable=False)
    tel_tuteur = db.Column(db.String(255), nullable=False)
    email_tuteur = db.Column(db.String(255), nullable=False)
    
    
    def json(self):
        print(dir(self),file=sys.stderr)
        return {
            "id": self.id,
            "nom": self.nom ,
            "prenom": self.prenom,
            "date_naissance": self.date_naissance,
            "nom_tuteur": self.nom_tuteur, 
            "prenom_tuteur": self.prenom_tuteur,
            "tel_tuteur": self.tel_tuteur,  
            "email_tuteur": self.email_tuteur
        }
    
class Saisons(db.Model):
    __tablename__ = 'Saisons'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_debut = db.Column(db.Date, nullable=False)
    date_fin = db.Column(db.Date, nullable=False)
    actuelle = db.Column(db.Boolean, nullable=False)

class Inscriptions(db.Model):
    __tablename__ = 'Inscriptions'
    id_enfant = db.Column(db.Integer, db.ForeignKey('Enfants.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    id_saison = db.Column(db.Integer, db.ForeignKey('Saisons.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    groupe = db.Column(db.Integer, nullable=False)
    transport = db.Column(db.Boolean, nullable=False)
    
    __table_args__ = (
        db.CheckConstraint('groupe > 0 AND groupe <= 8', name='check_groupe'),
    )

class Paiements(db.Model):
    __tablename__ = 'Paiements'

    id_enfant = db.Column(db.Integer, db.ForeignKey('Inscriptions.id_enfant', ondelete='CASCADE'), primary_key=True, nullable=False)
    id_saison = db.Column(db.Integer, db.ForeignKey('Inscriptions.id_saison', ondelete='CASCADE'), primary_key=True, nullable=False)
    mois = db.Column(db.Integer, primary_key=True, nullable=False)
    paye = db.Column(db.Boolean, nullable=False)

    __table_args__ = (
        db.CheckConstraint('mois > 0 AND mois <= 12', name='check_mois'),
    )
    

class Archives(db.Model):
    __tablename__ = 'Archives'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_debut = db.Column(db.Date, nullable=False)
    date_fin = db.Column(db.Date, nullable=False)
    fichier = db.Column(db.String(255), nullable=False)