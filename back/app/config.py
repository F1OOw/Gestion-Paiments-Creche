from os import getenv
from dotenv import load_dotenv

load_dotenv()

MYSQL_CONTAINER_NAME=getenv("MYSQL_CONTAINER_NAME")
MYSQL_ROOT_PASSWORD=getenv("MYSQL_ROOT_PASSWORD")
MYSQL_DATABASE=getenv("MYSQL_DATABASE")
MYSQL_USER=getenv("MYSQL_USER")
MYSQL_PASSWORD=getenv("MYSQL_PASSWORD")
MYSQL_PORT=getenv("MYSQL_PORT")

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_CONTAINER_NAME}/{MYSQL_DATABASE}'
SQLALCHEMY_TRACK_MODIFICATIONS = False

ARCHIVE_FOLDER=getenv("ARCHIVE_FOLDER")

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