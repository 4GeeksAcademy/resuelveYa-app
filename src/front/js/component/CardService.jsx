import React from 'react'
import './styles/cardService.css'

export const CardService = ({ data }) => {
    return (
        <div className='border card-service rounded'>
            <div className='img d-flex justify-content-center align-items-center ' >
                {/* <img/> */}
                <h4>Imagen</h4>
            </div>
            <div className='p-2'>
                <h5>{data.name}</h5>
                <p className='text-start'>{data.description}</p>
                <p className='text-start border rounded p-2'><span className='fw-bold'>Horarios:</span> {data.timeDisp}</p>
                <div className='d-flex gap-2 justify-content-between align-items-center'>
                    <p className='m-0 fw-bold'>{data.service}</p>
                    <div className='d-flex gap-1 '>
                        <i className="fs-4 fa-solid fa-thumbs-up"></i>
                        <i className="fs-4 fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}