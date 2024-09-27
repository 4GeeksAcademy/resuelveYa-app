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

export const Jumbotron = () => {
    const [searchInp1, setSearchInp1] = useState('')
    const [searchLocation, setSearchLocation] = useState('')

    return (
        <div className="header text-white d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: "100px", marginBottom: "120px" }}>
            <SearchFilter title={'Bienvenido a ResuelveYa'} subTitle={'¡Encuentra tu solución aquí!'} value={'a'} />
            <div className='d-flex position-relative gap-5'>
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
        </div>
    )
}