# schemas.py

from pydantic import BaseModel


class UserIn(BaseModel):
    name: str
    email: str


class UserOut(BaseModel):
    id: int
    name: str
    email: str

    class Config:  # Permite que el modelo se pueda convertir en ORM
        orm_mode = True

class CompanyIn(BaseModel):
    name: str
    address: str


class CompanyOut(BaseModel):
    id: int
    name: str
    address: str

    class Config:
        orm_mode = True