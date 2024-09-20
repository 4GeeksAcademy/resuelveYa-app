import React, { useContext, useEffect, useState } from 'react'
import { CardService } from './CardService.jsx'
import './styles/listServices.css'
import { Context } from "../store/appContext";
export const ListServices = () => {
    const { actions, store } = useContext(Context)
    const [users, setUsers] = useState([])
    const demoList = [
        {
            name: 'Pedrito',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Lunes a vieres',
            service: 'Albañil'
        },
        {
            name: 'Pedrito',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Martes y miercoles',
            service: 'Plomero'
        },
        {
            name: 'Me',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Miercoles',
            service: 'Electricista'
        },
        {
            name: 'Electrocutaste',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Lunes a vieres',
            service: 'Pintor'
        },
        {
            name: 'Pedrito',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Lunes a vieres',
            service: 'Gasfitero'
        },
        {
            name: 'Pedrito',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Martes y miercoles',
            service: 'Plomero'
        },
        {
            name: 'Me',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Miercoles',
            service: 'Electricista'
        },
        {
            name: 'Electrocutaste',
            description: 'Soy un hombre que resuelve',
            timeDisp: 'Lunes a vieres',
            service: 'Pintor'
        },
    ]

    const getUsers = async () => {
        const data = await actions.getUsers()
        setUsers(data)
        console.log(data)
    }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    return (
        <div className='mt-4'>
            <h1>Servicios Mas Populares</h1>
            {/* {
                store.listServices.map((user, index) => (
                    <CardService user={user} key={index}/>
                ))
            } */}
            {/* <div id="carouselExampleAutoplaying" className="carousel slide bg-secondary p-5 w-75 mx-auto rounded" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className='fs-2 fw-bold text-white bg-danger'>Electricista</div>
                    </div>
                    <div className="carousel-item">
                        <div className='fs-2 fw-bold text-white bg-warning'>Gasfitero</div>
                    </div>
                    <div className="carousel-item">
                        <div className='fs-2 fw-bold text-white bg-success '>Cerrajero</div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div> */}
        </div>
    )
}

