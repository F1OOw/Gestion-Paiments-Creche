from flask.blueprints import Blueprint
from models import *
from utils import *
from db import db

routes = Blueprint("routes",__name__)


@routes.route("/")
def t():
    pass