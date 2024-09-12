import React from 'react'
import { CardService } from './CardService.jsx'
import './styles/listServices.css'

export const ListServices = () => {

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

    return(
        <div className='grid-container mx-auto'>
            {
                demoList.map((data, index) => (
                    <CardService data={data} key={index}/>
                ))
            }
        </div>
    )
}

