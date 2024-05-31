from flask import Flask, Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash
import logging

app = Flask(__name__)
# Configurar el nivel de registro
logging.basicConfig(level=logging.INFO)

# Define la URL de la base de datos
db_url = 'mysql+pymysql://katari:katari123456@db:3306/db_katari'
# Sobrescribe la configuración de SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
db = SQLAlchemy(app)
CORS(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.Text, unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id', ondelete='CASCADE'))
    company = db.relationship('Company', back_populates='users')

class Company(db.Model):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    subdomain = Column(String(100), nullable=False, unique=True)
    users = relationship('User', back_populates='company')

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    logging.info('Solicitud recibida en la ruta /api/user/register')
    data = request.get_json()
    # Validar datos obligatorios
    if not all(key in data for key in ['name', 'lastname', 'dni', 'email', 'password', 'company_id']):
        return jsonify({'error': 'Faltan datos obligatorios'}), 400
    # Encriptar contraseña
    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        lastname=data['lastname'],
        dni=data['dni'],
        email=data['email'],
        password=hashed_password,
        company_id=data['company_id']
    )
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Usuario registrado exitosamente'}), 201
    except Exception as e:
        logging.error(f'Error al registrar usuario: {e}')
        db.session.rollback()
        return jsonify({'error': 'Error al registrar usuario'}), 500

@app.route('/api/companies', methods=['GET'])
def get_companies():
    companies = Company.query.all()
    company_list = [{'id': company.id, 'name': company.name} for company in companies]
    return jsonify(company_list), 200

@app.route('/api/users', methods=['GET'])
def get_users():
    company_subdomain = request.args.get('company')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    company = Company.query.filter_by(subdomain=company_subdomain).first()
    if company:
        users_query = User.query.filter_by(company_id=company.id)
        total_count = users_query.count()
        users = users_query.paginate(page=page, per_page=limit)
        user_list = []
        for user in users.items:
            user_data = {
                'id': user.id,
                'name': user.name,
                'lastname': user.lastname,
                'dni': user.dni,
                'email': user.email,
                'company_id': user.company_id
            }
            user_list.append(user_data)
        response = {
            'users': user_list,
            'totalCount': total_count,
            'currentPage': page,
            'totalPages': users.pages
        }
        return jsonify(response), 200
    else:
        return jsonify({'error': 'Empresa no encontrada'}), 404

app.register_blueprint(auth, url_prefix='/api/user')

if __name__ == '__main__':
    logging.info('Iniciando la aplicación Flask...')
    app.run(host='0.0.0.0', port=5000, debug=True)