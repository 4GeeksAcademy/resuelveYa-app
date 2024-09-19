import React from 'react'
import './styles/cardService.css'

export const CardService = ({ user }) => {
    return (
        <div className='border card-service rounded'>
            <div className='img d-flex justify-content-center align-items-center img-container' >
                <img src={user.post_img}/>
                {/* <h4>Imagen</h4> */}
            </div>
            <div className='p-2'>
                <h5 className='m-0'>{user.title}</h5>
                <p className='text-center m-0 fs-5 fw-semibold text-secondary'>{user.username}</p>
                <div className='border rounded p-2'>
                    <p className='text-start m-0'><span className='fw-bold'>Descripcion: </span>{user.description}</p>
                    <p className='text-start m-0'><span className='fw-bold'>Precio: </span>s/{user.price}</p>
                    <p className='text-start m-0'><span className='fw-bold'>Horarios: </span>{user.service_time}</p>

                </div>
                <div className='d-flex mt-1 border rounded p-2 gap-2 justify-content-between align-items-center'>
                    <p className='m-0 fw-bold' style={{textTransform: 'capitalize'}}>{user.service_type}</p>
                    <div className='d-flex gap-1 '>
                        <i className="fs-4 fa-solid fa-thumbs-up"></i>
                        <i className="fs-4 fa-solid fa-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}