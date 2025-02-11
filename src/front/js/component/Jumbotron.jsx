import React, { useState } from 'react';
import "./styles/jumbotron.css"
// import bgImage from '../../../../public/bg.jpg'
import { SearchFilter } from './SearchFilter.jsx';
import jardinero from '../../img/jardinero.jpg'
import gasfitero1 from '../../img/gasfitero1.jpg'
import limpieza from '../../img/limpieza2.jpg'
import manicurista from '../../img/manicurista.jpg'
import pintor from '../../img/pintor.jpg'
import electricista from '../../img/electricista.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const Jumbotron = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <div className="header text-white d-flex flex-column justify-content-center align-items-center">
                <SearchFilter title={'Bienvenido a ResuelveYa'} subTitle={'¡Encuentra tu solución aquí!'} />
                <div className='d-none d-md-flex position-relative gap-5'>
                    <div style={{ paddingTop: "180px" }}>
                        <img src={jardinero} alt="" className='img-fluid object-fit-cover border rounded-4 shadow' style={{ width: "100px", height: "100px" }} />
                    </div>
                    <div style={{ paddingTop: "40px" }}>
                        <img src={gasfitero1} alt="" className='img-fluid object-fit-cover border rounded-4 shadow' style={{ width: "140px", height: "140px" }} />
                    </div>
                    <div>
                        <img src={limpieza} alt="" className='img-fluid object-fit-cover border rounded-4 shadow' style={{ width: "280px", height: "280px" }} />
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <img src={manicurista} alt="" className='img-fluid object-fit-cover border rounded-4 shadow' style={{ width: "120px", height: "120px" }} />
                    </div>
                    <div style={{ paddingTop: "160px", right: "5%" }} className='position-absolute bottom-0'>
                        <img src={pintor} alt="" className='img-fluid object-fit-cover border rounded-4 shadow' style={{ width: "130px", height: "130px" }} />
                    </div>
                    <div style={{ paddingTop: "25px" }} >
                        <img src={electricista} alt="" className='img-fluid object-fit-cover border rounded-4 shadow' style={{ width: "80px", height: "80px" }} />
                    </div>
                </div>
            </div >

            <div className='d-md-none w-100 overflow-hidden mb-5'>

                <Slider {...settings}>
                    <div>
                        <div style={{ height: "300px" }}>
                            <img src={jardinero} alt="Jardinero" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "300px" }}>
                            <img src={gasfitero1} alt="Gasfitero" className="w-100 h-100  object-fit-cover" />
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "300px" }}>
                            <img src={limpieza} alt="Limpieza" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "300px" }}>
                            <img src={manicurista} alt="Manicurista" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "300px" }}>
                            <img src={pintor} alt="Pintor" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "300px" }}>
                            <img src={electricista} alt="Electricista" className="w-100 h-100 object-fit-cover" />
                        </div>
                    </div>




                </Slider>
            </div>

        </>
    )
}