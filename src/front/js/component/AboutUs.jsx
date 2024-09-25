import React from 'react'
import './styles/aboutUs.css'

const AboutUs = () => {
    return (
        <div className='aboutUs py-3 w-75 mx-auto'>
            <h2 className='about-h22'>Sobre Nosotros</h2>
            <div className='about-div-h2'>
                <p className='text-start about-h2 fs-4 fw-normal'>En ResuelveYa, nos dedicamos a conectar a personas con profesionales calificados para los servicios que necesitan.</p>
            </div>
            <div className='text-start about-p fs-4 fw-normal'>
                <p className='text-start about-h2 fs-4 fw-normal'>en el momento que los necesitan. Nuestra misión es simplificar la búsqueda de especialistas confiables,</p>
            </div>
            <div className='about-div-img my-5'>
                <img className='about-img' src="https://www.mndelgolfo.com/blog/wp-content/uploads/2017/09/herramientas-para-electricista.jpg" alt="electricista" />
            </div>

            {/* <div className='about-div-h2'>
                <p className='text-start about-h2 fs-4 fw-normal'>
                    Ofrecemos una plataforma fácil de usar para encontrar electricistas, pintores, fontaneros y muchos más, de forma rápida y segura.
                </p>
            </div>
            <div className='about-div-img my-5'>
                <img className='about-img' src="https://pinturashipopotamo.es/wp-content/uploads/2020/01/como-elegir-un-buen-pintor.jpg" alt="electricista" />
            </div> */}

            <div className='about-div-h2'>
                <p className='text-start about-h2 fs-4 fw-normal'>
                    Ofrecemos una plataforma fácil de usar para encontrar electricistas, pintores, fontaneros y muchos más, de forma rápida y segura.
                </p>
            </div>
            <div className='about-div-img my-5'>
                <img className='about-img' src="https://pinturashipopotamo.es/wp-content/uploads/2020/01/como-elegir-un-buen-pintor.jpg" alt="electricista" />
            </div>
            
            <h2>
                ¿Por qué elegirnos?
            </h2>
            <p className='text-start about-p fs-4 fw-normal'>En ResuelveYa, trabajamos para eliminar la incertidumbre que puede existir al contratar profesionales.</p>
            <p className='text-start about-p fs-4 fw-normal'>Con nosotros, puedes estar seguro de que recibirás atención de calidad, de manos de expertos con amplia experiencia en sus respectivos campos.</p>
        </div>
    )
}

export default AboutUs