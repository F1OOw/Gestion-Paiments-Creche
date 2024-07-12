import requests
import random

url = "http://localhost:8000"

def get_current_saison():
    r = requests.get(url+"/api/saison")
    return r.json()

def modifier_current_saison(debut,fin):
    saison = {
        "date_debut": debut,
        "date_fin": fin
    }
    
    r = requests.put(
        url+"/api/saison",
        json=saison
    )
    return r.json()

def creer_nouvelle_saison(debut,fin):
    saison = {
        "date_debut": debut,
        "date_fin": fin
    }
    
    r = requests.post(
        url+"/api/saison",
        json=saison
    )
    return r.json()

def get_enfants_saison():
    r = requests.get(url+"/api/saison/enfants")
    return r.json()

def supprimer_enfant_saison(id):
    r = requests.delete(
        url+"/api/saison/enfants/"+str(id)
    )
    return r.json()

def supprimer_enfants_saison():
    enfants = get_enfants_saison()
    for en in enfants:
        supprimer_enfant_saison(en['id'])

def ajouter_enfant_saison(id,groupe,transport):
    r = requests.post(
        url+"/api/saison/enfants/"+str(id),
        json={
            "groupe": groupe,
            "transport": transport
        }
    )
    
    return r.json()

def ajouter_enfants_bdd_saison():
    r = requests.get(
        url+"/api/enfants",
    )
    enfants = r.json()
    
    for en in enfants:
        ajouter_enfant_saison(en['id'],random.randint(1,5),random.randint(0,1))

def get_unpaid_enfants(mois):
    r = requests.post(
        url+"/api/saison/paiements",
        json={"mois": mois}
    )
    return r.json()

def get_status_paiement_enfant(id):
    r = requests.get(
        url+"/api/saison/paiements/"+str(id)
    )
    return r.json()

def modifier_status_paiement(id,mois):
    r = requests.post(
        url+"/api/saison/paiements/"+str(id),
        json={"mois":mois}
    )
    return r.json()