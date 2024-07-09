CREATE DATABASE IF NOT EXISTS creche ;

USE creche ;

CREATE TABLE IF NOT EXISTS Enfants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    date_naissance DATE,
    nom_tuteur VARCHAR(255),
    prenom_tuteur VARCHAR(255),
    tel_tuteur VARCHAR(255),
    email_tuteur VARCHAR(255)
) ;

CREATE TABLE IF NOT EXISTS Saisons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_debut DATE,
    date_fin DATE,
    actuelle BOOLEAN
) ;

CREATE TABLE IF NOT EXISTS Inscriptions(
    id_enfant INT,
    id_saison INT ,
    groupe INT CHECK(groupe>0 AND groupe<=8),
    transport BOOLEAN,
    FOREIGN KEY (id_enfant) REFERENCES Enfants(id) ON DELETE CASCADE ,
    FOREIGN KEY (id_saison) REFERENCES Saisons(id) ON DELETE CASCADE ,
    PRIMARY KEY(id_enfant, id_saison)
) ;

CREATE TABLE IF NOT EXISTS Paiements (
    id_enfant INT ,
    id_saison INT ,
    mois INT CHECK(mois > 0 AND mois <= 12) NOT NULL ,
    paye BOOLEAN ,
    FOREIGN KEY (id_enfant,id_saison) REFERENCES Inscriptions(id_enfant,id_saison) ON DELETE CASCADE ,
    PRIMARY KEY(id_enfant, id_saison, mois)
) ;

CREATE TABLE IF NOT EXISTS Archives (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date_debut DATE,
    date_fin DATE,
    fichier VARCHAR(255)
) ;