import React from 'react';
import "./styles/jumbotron.css"

export const Jumbotron = () => {
    return (
        <div className="jumbotron jumbotron-fluid p-5">
            <div className="container rounded-4 text-white p-2">
                <h1 className="display-3 fw-semibold">¡Bienvenidos a ResuelveYa!</h1>
                <h2>¡Nosotros si resolvemos!</h2>
                <br></br>
                <p className="lead fw-semibold">
                    En ResuelveYa, te facilitamos el acceso a profesionales calificados para todas tus necesidades.
                    Desde electricistas, pintores hasta fontaneros y más, nuestra plataforma te conecta con expertos confiables de manera rápida y sencilla, justo cuando los necesitas.
                </p>
            </div>
        </div>
    )
}