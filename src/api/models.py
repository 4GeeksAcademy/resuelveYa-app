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
    role = db.Column(db.String(50), nullable=False)  
    service_type = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(150), nullable= True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    profile_image = db.Column(db.String(255), nullable=True) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    reset_code = db.Column(db.String(6), nullable=True)  
    reset_code_expiration = db.Column(db.DateTime, nullable=True)  

 
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

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    post_img = db.Column(db.String(400), nullable=True)
    location = db.Column(db.String(100), nullable=True)

    user = db.relationship('User', back_populates='service_posts', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title, 
            "description": self.description,
            "service_type": self.service_type, 
            "user_id": self.user_id,
            "user_name": self.user.username,
            "user_lastname": self.user.lastname,
            "user_phone": self.user.phone,
            "user_profile":self.user.profile_image,
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M'),
            "post_img": self.post_img, 
            "location": self.location 
        }
   
class ServiceHistory(db.Model):
    __tablename__ = 'service_history'
    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)

    service_post_id = db.Column(db.Integer, db.ForeignKey('service_posts.id', ondelete='SET NULL'), nullable=True)

    payment_method = db.Column(db.String(255), nullable=True)  
    payment_id = db.Column(db.String(100), nullable=True)  
    amount_paid = db.Column(db.Float, nullable=True) 
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow) 

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
    service_history_id = db.Column(db.Integer, db.ForeignKey('service_history.id', ondelete='CASCADE'), nullable=False)
    payment_method = db.Column(db.String(255), nullable=False) 
    payment_id = db.Column(db.String(100), unique=True, nullable=False)  
    amount_paid = db.Column(db.Float, nullable=False) 
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)

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

    post_id = db.Column(db.Integer, db.ForeignKey('service_posts.id', ondelete='SET NULL'), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)

    rating = db.Column(db.Integer, nullable=True)  
    comment = db.Column(db.String(500), nullable=True)  
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    post = db.relationship('ServicePost', backref=db.backref('reviews', cascade="all, delete", lazy=True))
    user = db.relationship('User', backref='user_reviews', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "rating": self.rating,
            "comment": self.comment,
            "user_name": self.user.username if self.user else "Usuario eliminado",
            "last_name": self.user.lastname if self.user else "",
            "profile_img": self.user.profile_image if self.user else "",
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M')
        }

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=True)
    role = db.Column(db.String(50), nullable=False)  
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='messages', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "role": self.role,
            "content": self.content,
            "created_at": self.created_at.strftime('%d/%m/%Y %H:%M')
        }
