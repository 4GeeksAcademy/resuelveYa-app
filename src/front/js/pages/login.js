import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../component/LoginForm.jsx";

export const Login = () => {
	return (
		<div className="text-center mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                       <h1>ResuelveYA</h1>
                       <p>Si no tienes a alguien que resuelve... inicia sesión para solicitar nuestros servicios con tan solo unos clics.</p>
                    </div>
                    <div className="col">
                        <h2>Iniciar sesión</h2>
                        <LoginForm/>
                        <div className="text-center">
                            <p className="mt-4 mb-0">¿Aun no tienes cuenta?</p>
                            <Link to="/register">
				                <button className="btn btn-link fw-semibold text-black p-0">Registrate</button>
			                </Link>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
};