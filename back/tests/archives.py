import random
import requests

url = "http://localhost:8000"

def get_archives():
    r = requests.get(
        url+"/api/archives"
    )
    
    return r.json()

def archiver_saison(id):
    r = requests.get(
        url+"/api/saison/"+str(id)+"/archive"
    )
    
    return r.json()

def archiver_saison_actuelle():
    id = requests.get(url+"/api/saison").json()['id']
    return archiver_saison(id) 
