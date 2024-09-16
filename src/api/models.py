from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from flask import current_app

db = SQLAlchemy()

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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    reset_code = db.Column(db.String(6), nullable=True)  # Código de restablecimiento agregado
    reset_code_expiration = db.Column(db.DateTime, nullable=True)  # Fecha de expiración agregado

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
            "created_at": self.created_at
        }
## metodos JWT en caso sean mejor entendidos
    # def set_password(self, password):
    #     self.password = generate_password_hash(password)

    # def check_password(self, password):
    #     return check_password_hash(self.password, password)

    # def get_reset_token(self, expires_in=180):
    #     return jwt.encode(
    #         {'reset_password': self.id, 'exp': datetime.utcnow() + timedelta(seconds=expires_in)},
    #         current_app.config['SECRET_KEY'], algorithm='HS256')

    # @staticmethod
    # def verify_reset_token(token):
    #     try:
    #         id = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])['reset_password']
    #     except:
    #         return None
    #     return User.query.get(id)

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
            "created_at": self.created_at
        }

class ServicePost(db.Model):
    __tablename__ = 'service_posts'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_time = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='service_posts', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "service_type": self.service_type,
            "price": self.price,
            "user_id": self.user_id,
            "service_time": self.service_time,
            "created_at": self.created_at,
            "username": self.user.username,
            "lastname": self.user.lastname,
            "phone": self.user.phone
        }
    
class ServiceHistory(db.Model):
    __tablename__ = 'service_history'
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Usuario cliente
    provider_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Usuario proveedor
    service_post_id = db.Column(db.Integer, db.ForeignKey('service_posts.id'), nullable=False)

    payment_status = db.Column(db.String(50), nullable=False, default='En proceso')  # 'Concretado', 'No culminado', 'En proceso'
    service_status = db.Column(db.String(50), nullable=False, default='En proceso')  # 'Completado', 'No culminado', 'En proceso'
    payment_method = db.Column(db.String(255), nullable=True)  # 'Tarjeta de crédito', 'Tarjeta de débito'
    payment_id = db.Column(db.String(100), nullable=True)  # ID de la transacción desde la pasarela de pagos
    amount_paid = db.Column(db.Float, nullable=True)  # Monto pagado si el servicio se concretó
    commission_amount = db.Column(db.Float, nullable=True)  # Comisión del 10% sobre el pago
    client_accepted = db.Column(db.Boolean, default=False)  # Si el cliente ha aceptado la transacción
    provider_accepted = db.Column(db.Boolean, default=False)  # Si el proveedor ha aceptado la transacción

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relaciones explícitas con claves foráneas
    client = db.relationship('User', foreign_keys=[client_id], backref='client_histories', lazy=True)
    provider = db.relationship('User', foreign_keys=[provider_id], backref='provider_histories', lazy=True)
    service_post = db.relationship('ServicePost', backref='service_histories', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "provider_id": self.provider_id,
            "service_post_id": self.service_post_id,
            "payment_status": self.payment_status,
            "service_status": self.service_status,
            "payment_method": self.payment_method,
            "payment_id": self.payment_id,
            "amount_paid": self.amount_paid,
            "commission_amount": self.commission_amount,
            "client_accepted": self.client_accepted,
            "provider_accepted": self.provider_accepted,
            "created_at": self.created_at
        }