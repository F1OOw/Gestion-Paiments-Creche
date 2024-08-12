import sys
from functools import wraps
import jwt
from flask import jsonify, request
from models import *
from config import *
from string import ascii_letters, digits
from datetime import datetime,time,date, timedelta,timezone
import random
import traceback
from escpos.printer import Usb
from PIL import Image, ImageOps

def jsonify_alchemy(object):   
    class_name = object.__class__.__name__
    class_defined_attributes = [key for key, value in globals()[class_name].__dict__.items() if not (callable(value) or key.startswith('__') or key.startswith('_'))]
    
    json = {}
    
    for key in class_defined_attributes:
        val = getattr(object,key)
        
        if isinstance(val,date):    
            val = datetime.strftime(val,'%Y-%m-%d')
            
        json[key] = val
            
    return json

def internal_server_error(e):
    print(str(e),file=sys.stderr)
    traceback.print_exc()
    return jsonify({'message': "Internal Server Error"}), 500

def controller_template(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        
        except Exception as e:
            return internal_server_error(e)
        
    return decorated

def deleted_message():
    return jsonify({"message": "Deleted succesfully"}), 200

def get_months(start_date,end_date):
    
    start = datetime.combine(start_date, time.min)
    end = datetime.combine(end_date, time.min)

    months = []
    while start <= end:
        months.append(start.month)
        
        if start.month == 12:
            start = datetime(start.year + 1, 1, 1)
        else:
            start = datetime(start.year, start.month + 1, 1)

    return months

def gen_random_file_name(length):
    return "".join([random.choice(ascii_letters+digits) for i in range(length)])

def extract_token(request):
    token = request.headers.get('Authorization')

    if not token:
        return None

    # Check if the token starts with 'Bearer ' and extract the token
    if 'Bearer ' in token:
        token = token.split('Bearer ')[1]
        return token
    
    return None

def decode_token(token):
    return jwt.decode(token, SECRET_KEY , algorithms="HS256")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = extract_token(request)
        
        if not token:
            return jsonify({'Alert!': 'Token is missing!'}), 401

        try:
            data = decode_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({'Message': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'Message': 'Invalid token'}), 403

        return f(*args, **kwargs)

    return decorated

def generate_token(username):
    token = jwt.encode(
        {
            'user': username,
            'exp': datetime.now(timezone.utc) + timedelta(hours=TOKEN_EXPIRATION_TIME)
        }, SECRET_KEY, 
        
        algorithm='HS256'
    )
    
    return token

def print_receipt(id_enfant):
    data = request.get_json()
    mois = data['mois']
    enfant = db.session.query(Enfants).filter_by(id=id_enfant).first()
    saison = db.session.query(Saisons).filter_by(actuelle=True).first()
    
    frais_mensuels = 9000
    frais_transport = 2000
    link_fb = "https://www.facebook.com/profile.php?id=100052214141713"
    
    
    inscr = db.session.query(Inscriptions).filter_by(id_enfant=enfant.id, id_saison=saison.id).first()
    
    # Initialize the printer
    printer = Usb(VENDOR_ID, PRODUCT_ID,out_ep=EP_OUT, in_ep=EP_IN)
    
    image = Image.open("/app/utils/logo.jpg")
    image = image.convert('L')
    image = image.resize((384, int(384 * image.height / image.width)))
    image = ImageOps.pad(image, (384, image.height), color="black")
    
    printer.set(align='center', bold=True)
    printer.image(image)

    printer.set(align='center', bold=False)
    printer.text("Etablissement Creche Benmeziane\n\n")
    printer.set(align='left', bold=False)

    printer.set(underline=1)
    printer.text("Tel:")
    printer.set(underline=0)
    printer.text(" 07.75.54.44.73\n")
    printer.set(underline=1)
    printer.text("Adr:")
    printer.set(underline=0)
    printer.text(" Cite Kebbi Seddouk Centre\n")
    printer.set(underline=1)
    printer.text("Fb :")
    printer.set(underline=0)
    printer.text(" creche benmeziane le chateau des enfants\n\n")
    
    printer.set(align='center', width=2,height=2, bold=True)
    printer.text("Bon De Paiement\n\n")
    
    
    printer.set(align="left",width=1,height=1,bold=False)
    printer.text("Je sousigne, Gestionnaire de l'Etablissement\nreconnais avoir recu de Mr/Mme.\n")
    printer.set(bold=True)
    printer.text(f"{enfant.nom} {enfant.prenom}\n")
    printer.set(bold=False)
    printer.text("La somme de: ")
    printer.set(bold=True)
    
    somme = frais_mensuels
    if (inscr.transport):
        somme += frais_transport
    
    printer.text(f"{somme}.00 DZD\n\n")
    printer.set(underline=1,bold=False)
    
    printer.text("Detailles:\n")
    printer.set(underline=1)
    printer.text("Type De Paiement:\n")
    printer.set(underline=0)
    printer.text("[ ] Especes\n")
    printer.text("[ ] Carte Magnetique\n\n")
    
    printer.set(underline=1,bold=False)
    printer.text("Mois:")
    printer.set(underline=0)
    printer.text(f" {months[mois]}\n")
    printer.set(underline=1)
    printer.text("Transport:")
    printer.set(underline=0)
    tr="NON"
    if inscr.transport:
        tr="OUI"
        
    printer.text(f" {tr}\n\n")
    
    printer.set(underline=1)
    printer.text("Frais Mensuels:")
    printer.set(underline=0,bold=True)
    printer.text(f" {frais_mensuels}.00 DZD\n")
    
    printer.set(underline=1,bold=False)
    printer.text("Frais De Transport:")
    printer.set(underline=0,bold=True)
    printer.text(F" {frais_transport}.00 DZD\n\n")
    
    printer.set(underline=1,bold=False)
    printer.text("Total:")
    printer.set(underline=0,bold=True)
    printer.text(f" {somme}.00 DZD\n\n\n")    
    
    current_datetime = datetime.now()
    formatted_datetime = current_datetime.strftime("%d-%m-%Y %H:%M:%S")
    
    printer.set(underline=1)
    printer.text("Fais Le:")
    printer.set(underline=0)
    printer.text(f" {formatted_datetime}\n")
    
    printer.set(align="right")
    printer.text("Le Gestionnaire\n\n")
    
    printer.set(align="center")
    printer.qr(link_fb,size=8)
    
    printer.text("\nMERCI")    

    printer.cut()
    printer.close()