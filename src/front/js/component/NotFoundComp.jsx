import React from 'react'
import './styles/notFound.css'
import { Link } from 'react-router-dom'

const NotFoundComp = () => {
    return (
        <div className='container-not-found'>
            <div>
                <div className='container-not-img mx-auto'>
                    <img src="https://cdn-icons-png.flaticon.com/512/4919/4919275.png" alt="" />
                </div>
                <h1 className='m-0'>4<span className='not-span'>0</span>4</h1>
                <h2 className='m-0'><span className='not-span'>Error</span>: Page Not Found</h2>
                <h3 className='text-center m-0'>Parece que te perdiste. <Link className='not-found-btn-home ' to='/'>Vuelve a la página principal.</Link></h3>
            </div>
        </div>
    )
}

export default NotFoundComp