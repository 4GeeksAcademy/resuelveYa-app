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

    // const getUsers = async () => {
    //     const data = await actions.getUsers()
    //     setUsers(data)
    //     console.log(data)
    // }

    // useEffect(() => {
    //     getUsers()
    // }, [])

    return (
        <div className='mt-4 w-100 mx-auto'>
            <h1>Servicios Mas Populares</h1>
            <div className='grid-container w-100 mx-auto'>
                {
                    store.listServices.map((user, index) => (
                        <CardService user={user} key={index} />
                    ))
                }
            </div>

        </div>
    )
}

