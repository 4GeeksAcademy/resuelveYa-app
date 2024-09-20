import React, { useContext, useEffect, useState } from "react";
import './styles/newPost.css'
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const NewPost = () => {
        const {actions} = useContext(Context)
        const [info, setInfo] = useState({})
        const navigate = useNavigate()

        const handleSubmit = (e) => {
                e.preventDefault()
                const newPost = {
                        'title': e.target.title.value,
                        'description': e.target.description.value,
                        'service_type': info.provider_info.service_type,
                        'price': Number(e.target.price.value),
                        'service_time': e.target.serviceTime.value,
                        'service_timetable': e.target.serviceTable.value

                }
                console.log(newPost)
                actions.newPostProvider(newPost)
                navigate('/')
        }

        const dataProvider = async () => {
                const data = await actions.getProviderInformation()
                console.log(data)
                setInfo(data)
        }
        
        useEffect(() => {
                dataProvider()
        }, [])
        
        return (
                <div className="d-flex flex-column justify-content-center p-5 bg-light">
                        <h1 className="text-center">Nueva Publicacion</h1>
                        <form className="d-flex flex-column gap-3 border rounded bg-white p-3" onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-between">
                                        <label htmlFor="title">Titulo: </label>
                                        <input className="border rounded" type="text" id="title" required/>
                                </div>
                                <div className="d-flex justify-content-between">
                                        <label htmlFor="description">Descripcion: </label>
                                        <textarea className="border rounded" name="description" id="description"required></textarea>
                                </div>
                                <div className="d-flex justify-content-between">
                                        <label htmlFor="price">Precio: </label>
                                        <input className="border rounded" type="text" id="price" required/>
                                </div>
                                <div className="d-flex justify-content-between">
                                        <label htmlFor="serviceTime">Horarios: </label>
                                        <input className="border rounded" type="text" id="serviceTime" required/>
                                </div>
                                <div className="d-flex justify-content-between">
                                        <label htmlFor="serviceTable">Dias disponibles: </label>
                                        <input className="border rounded" type="text" id="serviceTable" required/>
                                </div>
                                <div className="d-flex gap-2">
                                        <label htmlFor="category">Categoria:</label>
                                        <p className="p-1 border rounded text-secondary" style={{textTransform: 'capitalize'}}>{info.provider_info?.service_type}</p>
                                </div>
                                <div>
                                        <button>Enviar</button>
                                </div>
                        </form>
                </div>
        );
};