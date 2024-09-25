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
            <h1>Servicios más populares</h1>
            {/* <div className='grid-container w-100 mx-auto'>
                {
                    store.reviews.map((user, index) => (
                        <CardService user={user} key={index} />
                    ))
                }
            </div> */}

            <div className='w-75 w-lg-50 mx-auto my-4' style={{maxWidth: '1000px'}}>

                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
                    <div className="carousel-inner">
                        <div className="carousel-item active w-100">
                            <div className='list-card-div list-card-1'>
                                {/* <img src={store.reviews[0]?.post.post_img} alt="" /> */}
                                <h2 className='list-card-h2'>{store.reviews[0]?.post.title}</h2>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='list-card-div list-card-2'>
                                <h2 className='list-card-h2'>{store.reviews[1]?.post.title}</h2>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='list-card-div list-card-3'>
                                <h2 className='list-card-h2'>{store.reviews[2]?.post.title}</h2>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='list-card-div list-card-4'>
                                <h2 className='list-card-h2'>{store.reviews[3]?.post.title}</h2>
                            </div>
                        </div>
                    </div>
                    {/* <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button> */}
                </div>
            </div>
        </div>
    )
}

