import React, { useContext, useEffect, useState } from "react";
import './styles/newPost.css'
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const NewPost = () => {
        const { actions } = useContext(Context)
        const [info, setInfo] = useState({})
        const navigate = useNavigate()
        const [loading, setLoading] = useState(false)
        const [imgUrl, setImgUrl] = useState('')

        const cloud_name = 'dkpc68gvv'
        const preset_name = 'resuelve-ya'
        

        const handleSubmit = (e) => {
                e.preventDefault()
                const newPost = {
                        'title': e.target.title.value,
                        'description': e.target.description.value,
                        'service_type': info.provider_info.service_type,
                        // 'phone_number': e.target.phone_number.value,
                        // 'service_time': e.target.serviceTime.value,
                        // 'service_timetable': e.target.serviceTable.value,
                        'post_img': imgUrl,
                        'location': e.target.location.value
                }
                console.log(newPost)
                // actions.newPostProvider(newPost)
                actions.setDataNewPost(newPost)
                // navigate('/')
        }

        const handleChangeImg = async (item) => {
                const file = item
                const data = new FormData()
                data.append('file', file[0])
                data.append('upload_preset', preset_name)

                setLoading(true)

                try {
                        const response =  await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                                method: 'POST',
                                body: data
                        })
                        const dataImg = await response.json()
                        console.log(dataImg.url)
                        setImgUrl(dataImg.url)
                } catch (err){
                        console.log(err)
                }
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
                <div className="d-flex gap-3 flex-column justify-content-center p-5 bg-light h-100vh">
                        <form className="d-flex flex-column gap-4 border rounded bg-white p-3" onSubmit={handleSubmit}>
                                <h1 className="text-center">Nueva Publicación</h1>
                                <div className="d-flex justify-content-between align-items-center gap-1">
                                        <label htmlFor="title">Título: </label>
                                        <input className="inputs-new-post border rounded" type="text" id="title" required />
                                </div>
                                <div className="d-flex justify-content-between gap-1">
                                        <label htmlFor="description">Descripción: </label>
                                        <textarea className="textarea-new-post border rounded" name="description" id="description" required></textarea>
                                </div>
                                {/* <div className="d-flex justify-content-between align-items-center gap-1">
                                        <label htmlFor="serviceTime">Horarios: </label>
                                        <input className="inputs-new-post border rounded" type="text" id="serviceTime" required />
                                </div> */}
                                <div className="d-flex justify-content-between align-items-center gap-1">
                                        <label htmlFor="serviceTable">Ubicación: </label>
                                        <input className="inputs-new-post border rounded" type="text" id="location" name="location" required />
                                </div>
                                <div className="d-flex gap-2 justify-content-center align-items-center">
                                        <label htmlFor="category">Categoria:</label>
                                        <p className="p-1 border rounded text-secondary m-0" style={{ textTransform: 'capitalize' }}>{info.provider_info?.service_type}</p>
                                        <label htmlFor="phone_number" style={{maxWidth: '100px'}}>Número de contacto:</label>
                                        <p className="p-1 border rounded text-secondary m-0" style={{ textTransform: 'capitalize' }}>{info.provider_info?.phone}</p>
                                </div>
                                <div className="d-flex gap-2 justify-content-start">
                                        <div>Imagen de publicación: </div>
                                        <label className={loading ? 'btn btn-success' : 'btn btn-secondary'} htmlFor="img_url">{loading ? 'Imagen cargada' : 'Cargar imagen'}</label>
                                        <input className="file-input" onChange={(e) => handleChangeImg(e.target.files)} type="file" name="img_url" id="img_url" accept=".jpg, .png, .jpeg" />
                                </div>
                                <div className="d-flex justify-content-center align-items-center p-2">
                                        {/* <Link to='/payment'> */}
                                                <button className='btn btn-danger'>Continuar</button>
                                        {/* </Link> */}
                                </div>
                        </form>

                        {/* <div>
                                <h1 className="text-center">Vista demo de publicacion</h1>

                        </div> */}
                </div>
        );
};