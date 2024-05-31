from flask import jsonify
from app import db
from app.models import Company

def get_companies():
    companies = Company.query.all()
    return jsonify([{'id': company.id, 'name': company.name} for company in companies])

def create_company(company_data):
    company = Company(name=company_data['name'])
    db.session.add(company)
    db.session.commit()
    return jsonify({'id': company.id, 'name': company.name})
