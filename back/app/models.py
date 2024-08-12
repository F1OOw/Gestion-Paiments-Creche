from db import db
import sys

class Enfants(db.Model):
    __tablename__ = 'Enfants'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nom = db.Column(db.String(255), nullable=True)
    prenom = db.Column(db.String(255), nullable=True)
    date_naissance = db.Column(db.Date, nullable=True)
    nom_tuteur = db.Column(db.String(255), nullable=True)
    prenom_tuteur = db.Column(db.String(255), nullable=True)
    tel_tuteur = db.Column(db.String(255), nullable=True)
    email_tuteur = db.Column(db.String(255), nullable=True)
    adresse = db.Column(db.String(512), nullable=True)

class Saisons(db.Model):
    __tablename__ = 'Saisons'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_debut = db.Column(db.Date, nullable=True)
    date_fin = db.Column(db.Date, nullable=True)
    actuelle = db.Column(db.Boolean, nullable=True)

class Inscriptions(db.Model):
    __tablename__ = 'Inscriptions'
    
    id_enfant = db.Column(db.Integer, db.ForeignKey('Enfants.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    id_saison = db.Column(db.Integer, db.ForeignKey('Saisons.id', ondelete='CASCADE'), primary_key=True, nullable=False)
    groupe = db.Column(db.Integer, nullable=False)
    transport = db.Column(db.Boolean, nullable=True)

    __table_args__ = (
        db.CheckConstraint('groupe > 0 AND groupe <= 5', name='check_groupe'),
    )

class Paiements(db.Model):
    __tablename__ = 'Paiements'

    id_enfant = db.Column(db.Integer, db.ForeignKey('Inscriptions.id_enfant', ondelete='CASCADE'), primary_key=True, nullable=False)
    id_saison = db.Column(db.Integer, db.ForeignKey('Inscriptions.id_saison', ondelete='CASCADE'), primary_key=True, nullable=False)
    mois = db.Column(db.Integer, primary_key=True, nullable=False)
    paye = db.Column(db.Boolean, nullable=True)

    __table_args__ = (
        db.CheckConstraint('mois > 0 AND mois <= 12', name='check_mois'),
    )

class Archives(db.Model):
    __tablename__ = 'Archives'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_debut = db.Column(db.Date, nullable=True)
    date_fin = db.Column(db.Date, nullable=True)
    fichier = db.Column(db.String(255), nullable=True)