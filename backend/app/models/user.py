from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    lastname = Column(String(100), nullable=False)
    dni = Column(String(20), unique=True, nullable=False)
    email = Column(Text, unique=True, nullable=False)
    password = Column(String(200), nullable=False)
    company_id = Column(Integer, ForeignKey('companies.id', ondelete='CASCADE'))

    company = relationship('Company', back_populates='users')
