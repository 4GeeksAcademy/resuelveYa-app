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
        <div className="header text-white d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: "100px" }}>
            <SearchFilter title={'Bienvenido a ResuelveYa'} subTitle={'¡Encuentra tu solución aquí!'} />
            <div>
                <div>
                    <img src={jardinero} alt="" className='img-fluid object-fit-cover border rounded' style={{ width: "80px", height: "80px" }} />
                </div>
                <div>
                    <img src={gasfitero1} alt="" className='img-fluid object-fit-cover border rounded' style={{ width: "150px", height: "150px" }} />
                </div>
                <div>
                    <img src={limpieza} alt="" className='img-fluid object-fit-cover border rounded' style={{ width: "250px", height: "250px" }} />
                </div>
                <div>
                    <img src={manicurista} alt="" className='img-fluid object-fit-cover border rounded' style={{ width: "100px", height: "10px" }} />
                </div>
                <div>
                    <img src={pintor} alt="" className='img-fluid object-fit-cover border rounded' style={{ width: "80px", height: "80px" }} />
                </div>
                <div>
                    <img src={electricista} alt="" className='img-fluid object-fit-cover border rounded' style={{ width: "60px", height: "60px" }} />
                </div>
            </div>
        </div>
    )
}