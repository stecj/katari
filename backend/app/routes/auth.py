from flask import Blueprint, request, jsonify
from app.models.user import User
from app import db
import logging

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    logging.info('Solicitud recibida en la ruta /api/user/register')
    data = request.get_json()

    new_user = User(
        name=data.get('name'),
        lastname=data.get('lastname'),
        dni=data.get('dni'),
        email=data.get('email'),
        password=data.get('password'),
        company_id=data.get('company_id')
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201
