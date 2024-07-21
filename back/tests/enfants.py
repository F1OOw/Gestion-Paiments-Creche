import random
import requests
from datetime import datetime
from faker import Faker

url = "http://localhost:8000"
faker = Faker()

# Ajout des enfants à la bdd
def ajouter_enfant_bdd():
    child_name = faker.first_name()
    child_surname = faker.last_name()
    birth_date = datetime.combine(faker.date_of_birth(minimum_age=0, maximum_age=10),datetime.min.time()).timestamp()
    
    tutor_name = faker.first_name()
    tutor_surname = faker.last_name()
    tutor_phone = faker.phone_number()
    tutor_email = faker.email()
    address = faker.address()
    
    data = {
        "nom": child_surname,
        "prenom": child_name,
        "date_naissance": birth_date,
        "nom_tuteur": tutor_surname,
        "prenom_tuteur": tutor_name,
        "tel_tuteur": tutor_phone,
        "email_tuteur": tutor_email,
        "adresse": address
    }
    
    r = requests.post(
            url+"/api/enfants",
            json=data
    )

    return r.json()

def ajouter_enfants_bdd(num):
    enfants = []
    for _ in range(num):
        ajouter_enfant_bdd()

def get_enfants_bdd():
    r = requests.get(
        url+"/api/enfants",
    )
    return r.json()

def infos_enfant(id):
    r = requests.get(
            url+"/api/enfants/"+str(id),
    )
    
    return r.json()

def supprimer_enfant(id):
    r = requests.delete(
            url+"/api/enfants/"+str(id),
    )
    return r.json()

def supprimer_enfants_bdd():
    enfants = get_enfants_bdd()
    for en in enfants:
        supprimer_enfant(en['id'])
