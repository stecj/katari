from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# Define la URL de la base de datos
db_url = 'mysql+pymysql://katari:katari123456@db:3306/db_katari'
# Sobrescribe la configuración de SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

# Importar la configuración desde config.py
from app.config.config import Config
app.config.from_object(Config)

db = SQLAlchemy(app)

# Importa los modelos para que Flask-Migrate los reconozca
#from app.models import user, company  # Agrega la importación del modelo company
from app.models.user import User
from app.models.company import Company

# Registra los blueprints después de importar los modelos
from app.routes import auth
app.register_blueprint(auth.auth, url_prefix='/api/user')

# Ejecuta las migraciones después de importar los modelos y registrar los blueprints
with app.app_context():
    db.create_all()
