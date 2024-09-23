from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta, timezone
from flask import current_app
from zoneinfo import ZoneInfo
from werkzeug.security import check_password_hash

db = SQLAlchemy()

def get_local_time():
    universal_time = datetime.now(timezone.utc)
    local_time = universal_time.astimezone(ZoneInfo('Etc/GMT+5'))
    return local_time

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    lastname = db.Column(db.String(250), nullable=False)
    dni = db.Column(db.String(50), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False)  # 'proveedor o cliente'
    service_type = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(150), nullable= True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    profile_image = db.Column(db.String(255), nullable=True) # almacenar las imagenes
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    reset_code = db.Column(db.String(6), nullable=True)  # Código de restablecimiento agregado
    reset_code_expiration = db.Column(db.DateTime, nullable=True)  # Fecha de expiración agregado

    # Relación con ServicePost
    service_posts = db.relationship('ServicePost', back_populates='user', cascade="all, delete", lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "lastname": self.lastname,
            "dni": self.dni,
            "phone": self.phone,
            "role": self.role,
            "service_type": self.service_type,
            "email": self.email,
            "profile_image": self.profile_image,
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M')
        }

class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M')
        }
    def check_password(self, password):
        return check_password_hash(self.password, password) 

class ServicePost(db.Model):
    __tablename__ = 'service_posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    service_time = db.Column(db.String(250), nullable=True)
    service_timetable = db.Column(db.String(250),nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    post_img = db.Column(db.String(400), nullable=True)
    location = db.Column(db.String(100), nullable=True)

    user = db.relationship('User', back_populates='service_posts', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title, #recibido desde el front --title
            "description": self.description, # recibido desde el front --description
            "service_type": self.service_type, # recibido desde el front --service_type
            # "price": self.price,
            "user_id": self.user_id,
            # "service_time": self.service_time,
            # "service_timetable": self.service_timetable,
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M'),
            "post_img": self.post_img, # recibido desde el front --post_img
            # "username": self.user.username, # 
            # "lastname": self.user.lastname,
            # "phone": self.user.phone,
            "location": self.location # recibido desde el front  --location
        }
   
class ServiceHistory(db.Model):
    __tablename__ = 'service_history'
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Usuario proveedor
    service_post_id = db.Column(db.Integer, db.ForeignKey('service_posts.id'), nullable=False)

    payment_method = db.Column(db.String(255), nullable=True)  # 'Tarjeta de crédito', 'Tarjeta de débito'
    payment_id = db.Column(db.String(100), nullable=True)  # ID de la transacción desde la pasarela de pagos
    amount_paid = db.Column(db.Float, nullable=True)  # Monto pagado
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)  # Fecha de la transacción

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    provider = db.relationship('User', foreign_keys=[provider_id], backref='provider_histories', lazy=True)
    service_post = db.relationship('ServicePost', backref='service_histories', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "provider_id": self.provider_id,
            "service_post_id": self.service_post_id,
            "payment_method": self.payment_method,
            "payment_id": self.payment_id,
            "amount_paid": self.amount_paid,
            "transaction_date": self.transaction_date.strftime('%d/%m/%Y'),
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M')
        }

class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    service_history_id = db.Column(db.Integer, db.ForeignKey('service_history.id'), nullable=False)
    payment_method = db.Column(db.String(255), nullable=False)  # Tarjeta de crédito, débito, etc.
    payment_id = db.Column(db.String(100), unique=True, nullable=False)  # ID de la transacción del procesador de pagos
    amount_paid = db.Column(db.Float, nullable=False)  # Monto pagado
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)

    # Relación con ServiceHistory
    service_history = db.relationship('ServiceHistory', backref='payments', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "service_history_id": self.service_history_id,
            "payment_method": self.payment_method,
            "payment_id": self.payment_id,
            "amount_paid": self.amount_paid,
            "payment_date": self.payment_date.strftime('%d/%m/%Y')
        }
       
class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('service_posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=True)  # Calificación del 1 al 5
    comment = db.Column(db.String(500), nullable=True)  # Comentarios
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    post = db.relationship('ServicePost', backref='reviews', lazy=True)
    user = db.relationship('User', backref='user_reviews', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M')
        }

