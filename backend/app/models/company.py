from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app import db

class Company(db.Model):
    __tablename__ = 'companies'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    subdomain = Column(String(100), nullable=False, unique=True)

    users = relationship('User', back_populates='company')
