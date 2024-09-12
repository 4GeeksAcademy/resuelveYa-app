"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token,JWTManager, get_jwt_identity, jwt_required

import datetime 

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def login():
    try:
        # Obtener los datos enviados por el cliente (email y contraseña)
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
            "user_id": user.id,
            "message": "Inicio de sesión exitoso"
        }), 200

    except Exception as e:
        return jsonify({"message": "Ocurrió un error en el servidor", "error": str(e)}), 500
