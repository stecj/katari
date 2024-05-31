import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = 'una-clave-secreta'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://katari:katari123456@db:3306/db_katari'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False