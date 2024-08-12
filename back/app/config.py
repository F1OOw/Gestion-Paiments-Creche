from os import getenv
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URI = f'sqlite:///app/data.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

ARCHIVE_FOLDER=getenv("ARCHIVE_FOLDER")

SECRET_KEY=getenv("SECRET_KEY")

USERNAME=getenv("USERNAME")
PASSWORD=getenv("PASSWORD")

TOKEN_EXPIRATION_TIME=int(getenv("TOKEN_EXPIRATION_TIME"))
NB_GROUPES=int(getenv("NB_GROUPES"))


months = {
    1: "Janvier",
    2: "Février",
    3: "Mars",
    4: "Avril",
    5: "Mai",
    6: "Juin",
    7: "Juillet",
    8: "Août",
    9: "Septembre",
    10: "Octobre",
    11: "Novembre",
    12: "Décembre"
}