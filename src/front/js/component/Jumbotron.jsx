import React, { useState } from 'react';
import "./styles/jumbotron.css"
// import bgImage from '../../../../public/bg.jpg'
import { SearchFilter } from './SearchFilter.jsx';
import jardinero from '../../img/jardinero.jpg'

export const Jumbotron = () => {
    const [searchInp1, setSearchInp1] = useState('')
    const [searchLocation, setSearchLocation] = useState('')

    return (
        <div className="header text-white d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: "100px" }}>
            <SearchFilter title={'Bienvenido a ResuelveYa'} subTitle={'¡Encuentra tu solución aquí!'} />
            <div>
                <div>
                    <img src={jardinero} alt="" />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}