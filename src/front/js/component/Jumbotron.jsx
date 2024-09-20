import React, { useState } from 'react';
import "./styles/jumbotron.css"
import bgImage from '../../../../public/bg.jpg'
import { SearchFilter } from './SearchFilter.jsx';

export const Jumbotron = () => {
    const [searchInp1, setSearchInp1] = useState('')
    const [searchLocation, setSearchLocation] = useState('')

    return (
        <header className="header text-white d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${bgImage})` }}>
            {/* <form className=''>
                <div className='d-flex'>
                    <div className='bg-white w-100 mx-auto p-5 rounded container-form'>
                        <input className='border rounded p-2' type='text' placeholder='Que estas buscando...?' />
                        <input className='border rounded p-2' style={{maxHeight: '150px'}} type="text" placeholder='Donde...?' />
                    </div>
                </div>
                <button className='btn btn-danger p-2 mt-1'>Buscar</button>
            </form> */}
            {/* <form className='w-75 p-4'>
                <h1>Bienvenido a ResuelveYa!</h1>
                <h2>Aqui encontraras la solucion</h2>
                <div className='container-jumbotron'>
                    <div className='input-1 input'>
                        <i className="fa-solid fs-3 fa-magnifying-glass d-flex justify-content-center align-items-center"></i>
                        <input className='' type="text" placeholder='¿Qué estás buscando...?' />
                    </div>
                    <div className='inpu-2 input'>
                        <i className="fa-solid fs-3 fa-location-dot"></i>
                        <input className='' style={{maxWidth: '5px'}} type='text' placeholder='¿Dónde...?' />
                    </div>
                </div>

            </form> */}
            <SearchFilter />
        </header>
    )
}