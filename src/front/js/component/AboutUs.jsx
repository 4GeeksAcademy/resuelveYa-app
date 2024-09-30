import React from 'react'
import './styles/aboutUs.css'
import gasfitero from '../../img/gasfitero-nosotros.png'
import gasfitero1 from '../../img/gasfitero-nosotros1.png'

const AboutUs = () => {

    return (
        <>
            <div className='aboutUs w-100 mb-5 shadow rounded-4 overflow-hidden'>
                <div className='d-flex flex-column flex-md-row align-items-center '>
                    <div className='px-5 py-5 md-py-0' style={{ flex: 2 }}>
                        <h3 className='fw-bold pb-4'>Nosotros</h3>
                        <p className='fs-5'>Bienvenido a ResuelveYa, la plataforma que conecta a usuarios con los mejores profesionales de servicios, como electricistas, pintores, gasfiteros, cocineros, etc. Nuestro objetivo es facilitarte la búsqueda de profesionales calificados de manera rápida y sencilla.
                            ¡Simplificamos la conexión entre quienes necesitan un servicio y quienes están listos para ofrecerlo!</p>
                    </div>
                    <figure className='m-0' style={{ flex: 1 }}>
                        <img src={gasfitero} alt="" className='first-img img-fluid w-100 h-100 object-fit-cover' />
                    </figure>

                </div>
            </div>
            <div className='aboutUs w-100 mx-auto shadow rounded-4 overflow-hidden'>
                <div className='d-flex flex-column-reverse flex-md-row align-items-center '>
                    <figure className='m-0' style={{ flex: 1 }}>
                        <img src={gasfitero1} alt="" className='second-img img-fluid w-100 h-100 object-fit-cover' />
                    </figure>
                    <div className='px-5 py-5 md-py-0 text-start' style={{ flex: 3 }}>
                        <h3 className='fw-bold pb-4'>¿Porqué elegirnos?</h3>
                        <ol className='' style={{ fontSize: "18px" }}>
                            <li>Fácil y rápido: Encuentra profesionales en minutos y reserva con solo unos clics.</li>
                            <li>Seguridad garantizada: Autenticación robusta y pasarela de pagos confiable.</li>
                            <li>Diversidad de servicios: Tenemos el profesional adecuado para ti.</li>
                            <li>Transparencia: Revisa las calificaciones y reseñas de los proveedores antes de tomar una decisión.</li>
                            <li>Soporte técnico: Siempre disponibles para ayudarte a través de nuestro chat integrado.</li>
                            <li>Sin necesidad de registro: Explora y busca servicios sin necesidad de crear una cuenta.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs