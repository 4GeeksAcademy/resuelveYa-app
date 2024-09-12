"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token,JWTManager, get_jwt_identity, jwt_required
import re
import datetime 

api = Blueprint('api', __name__)

users_created = False

@api.before_app_request
def create_test_users():
    global users_created
    if not users_created:

        if User.query.count() == 0:
 
            user1 = User(
                username='user1', 
                lastname='lastname1', 
                dni='12345678', 
                phone = '12341234',
                role='cliente', 
                service_type=None, 
                email='user1@example.com', 
                password=generate_password_hash('password1')
            )
            user2 = User(
                username='user2', 
                lastname='lastname2', 
                dni='23456789', 
                role='proveedor',
                phone = '12341234',
                service_type='electricista', 
                email='user2@example.com', 
                password=generate_password_hash('password2')
            )
            user3 = User(
                username='user3', 
                lastname='lastname3', 
                dni='34567890',
                phone = '12341234',
                role='cliente', 
                service_type=None, 
                email='user3@example.com', 
                password=generate_password_hash('password3')
            )
            user4 = User(
                username='user4', 
                lastname='lastname4', 
                dni='45678901', 
                role='proveedor', 
                phone = '12341234',
                service_type='gasfiter', 
                email='user4@example.com', 
                password=generate_password_hash('password4')
            )
            user5 = User(
                username='user5', 
                lastname='lastname5', 
                dni='56789012',
                phone = '12341234' ,
                role='cliente', 
                service_type=None, 
                email='user5@example.com', 
                password=generate_password_hash('password5')
            )

            # Agregar los usuarios a la base de datos
            db.session.add_all([user1, user2, user3, user4, user5])
            db.session.commit()


        users_created = True


@api.route('/login', methods=['POST'])
def login():
    try:
        # Obtener los datos enviados por el cliente
        body = request.get_json()
        email = body.get("email", None)
        password = body.get("password", None)

        # Verificar que ambos campos estén presentes
        if not email or not password:
            return jsonify({"message": "Email y contraseña son requeridos"}), 400

        # Buscar al usuario en la base de datos por email
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"message": "Usuario no encontrado"}), 404

        # Verificar la contraseña hasheada
        if not check_password_hash(user.password, password):
            return jsonify({"message": "Contraseña incorrecta"}), 401

        # Generar un token JWT si la contraseña es válida
        expires = datetime.timedelta(hours=1)
        access_token = create_access_token(identity=user.id, expires_delta=expires)

        # Devolver el token JWT al cliente
        return jsonify({
            "token": access_token,
            "username": user.username,
            "user_id": user.id,
            "message": "Inicio de sesión exitoso"
        }), 200

    except Exception as e:
        return jsonify({"message": "Ocurrió un error en el servidor", "error": str(e)}), 500
    
@api.route('/register', methods=['POST'])
def register():
    try:
        # Obtener datos del cliente a registrar
        body = request.get_json()
        first_name = body.get("first_name")
        last_name = body.get("last_name")
        dni = body.get("identity_document")  
        phone = body.get("phone")
        role = body.get("role")
        service_type = body.get("category")  
        email = body.get("email") 
        password = body.get("password")
        
        if not first_name or not last_name or not dni or not role or not email or not password or not phone:
            return jsonify({"message": "Todos los campos son requeridos"}), 400

        if role not in ["proveedor", "cliente"]:
            return jsonify({"message": "El rol debe ser 'proveedor' o 'cliente'"}), 400
        
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return jsonify({"message": "Email inválido"}), 400
        
        # Verificar si el email ya existe
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "El email ya está registrado"}), 400

        # Crear el nuevo usuario
        hashed_password = generate_password_hash(password)
        new_user = User(
            username=first_name,
            lastname=last_name,
            dni=dni,
            phone=phone,
            role=role,
            service_type=service_type,
            email=email,
            password=hashed_password
        )
        
        # guardar en el modelo
        db.session.add(new_user)
        db.session.commit()

        # Generar un token JWT para el usuario registrado
        access_token = create_access_token(identity=new_user.id)

        return jsonify({
            "token": access_token,
            "user_id": new_user.id,
            "message": "Registro exitoso"
        }), 201

    except Exception as e:
        return jsonify({"message": "Ocurrió un error en el servidor", "error": str(e)}), 500



@api.route('/users', methods=['GET'])
def get_users():
    try:
        # Obtener todos los usuarios de la base de datos
        users = User.query.all()
    
        if not users:
            return jsonify({"message": "No se encontraron usuarios"}), 404

        # Convertir los objetos User en diccionarios JSON
        users_list = [user.serialize() for user in users]

        return jsonify(users_list), 200

    except Exception as e:
        return jsonify({"message": "Ocurrió un error en el servidor", "error": str(e)}), 500
