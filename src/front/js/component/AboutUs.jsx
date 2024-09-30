import React, { useContext } from 'react'
import './styles/aboutUs.css'
import { Context } from '../store/appContext'
import gasfitero from '../../img/gasfitero-nosotros.png'
import gasfitero1 from '../../img/gasfitero-nosotros1.png'

const AboutUs = () => {
    const { store } = useContext(Context)

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
                            <li>Transparencia: Revisa los perfiles de los proveedores, sus calificaciones y disponibilidad antes de tomar una decisión.</li>
                            <li>Soporte técnico: Siempre disponibles para ayudarte a través de nuestro chat integrado.</li>
                            <li>Sin necesidad de registro: Explora y busca servicios sin necesidad de crear una cuenta.</li>
                        </ol>
                    </div>
                </div>
            </div>



            {/* <div className='about-div-h2 shadow-and-bg shadow'>
                

            <div className='about-div-h2 shadow-and-bg shadow'>
                <p className='text-start about-h2 fs-4 fw-normal'>
                    Ofrecemos una plataforma fácil de usar para encontrar electricistas, pintores, fontaneros y muchos más, de forma rápida y segura.
                </p>
            </div>
            <div className='about-div-img-2 my-5'>
                <img className='about-img' src="https://pinturashipopotamo.es/wp-content/uploads/2020/01/como-elegir-un-buen-pintor.jpg" alt="electricista" />
            </div>
            
            <div className='shadow-and-bg shadow'>
                <h2>
                    ¿Por qué elegirnos?
                </h2>
                <p className='text-start about-p fs-4 fw-normal'>En ResuelveYa, trabajamos para eliminar la incertidumbre que puede existir al contratar profesionales.</p>
                <p className='text-start about-p fs-4 fw-normal'>Con nosotros, puedes estar seguro de que recibirás atención de calidad, de manos de expertos con amplia experiencia en sus respectivos campos.</p>

            </div> */}
        </>
    )
}

export default AboutUs