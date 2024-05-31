from flask import jsonify
from app import db
from app.models import User

def get_users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'name': user.name, 'email': user.email, 'company_id': user.company_id} for user in users])

def create_user(user_data):
    user = User(name=user_data['name'], email=user_data['email'], company_id=user_data['company_id'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'company_id': user.company_id})
