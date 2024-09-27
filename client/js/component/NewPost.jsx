import React, { useContext, useEffect, useState } from "react";
import './styles/newPost.css'
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const NewPost = () => {
        const { actions, store } = useContext(Context)
        const [info, setInfo] = useState({})
        const navigate = useNavigate()
        const [loading, setLoading] = useState(false)
        const [isDisabled, setIsDisabled] = useState(true)
        const [imgUrl, setImgUrl] = useState('')

        const cloud_name = 'dkpc68gvv'
        const preset_name = 'resuelve-ya'
        
        const handleSubmit = (e) => {
                e.preventDefault()
                const newPost = {
                        'title': e.target.title.value,
                        'description': e.target.description.value,
                        'service_type': info.provider_info.service_type,
                        'post_img': imgUrl,
                        'location': e.target.location.value,
                }
                console.log(newPost)
                actions.setDataNewPost(newPost)
                navigate('/payment')
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
                        if(dataImg.url) {
                                setImgUrl(dataImg.url)
                                setIsDisabled(false)
                        }
                        console.log(dataImg.url)
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
                <div className="d-flex flex-column justify-content-center p-5">
                        <form className="form-control newpost-form-container d-flex flex-column p-3" onSubmit={handleSubmit}>
                                <h3 className="text-center">Nueva Publicación</h3>
                                <div className="col-12">
                                        <label className="form-label fw-semibold" htmlFor="title">Título </label>
                                        <input className="form-control inputs-new-post border w-100" placeholder="Escribe un título" type="text" id="title" required />
                                </div>
                                <div className="col-12">
                                        <label className="form-label fw-semibold" htmlFor="description">Descripción </label>
                                        <textarea className="form-control textarea-new-post border w-100" placeholder="Escribe una descripcion de tu servicio" name="description" id="description" required></textarea>
                                </div>
                                <div className="col-12">
                                        <label className="form-label fw-semibold" htmlFor="serviceTable">Ubicación </label>
                                        <input className="form-control inputs-new-post border w-100" placeholder="¿Donde te encuentras?" type="text" id="location" name="location" required />
                                </div>
                                <div className="row pb-2">
                                        <div className="col-6">
                                                <label className="form-label fw-semibold" htmlFor="category">Categoria</label>
                                                <input className="form-control text-capitalize" type="text" value={info.provider_info?.service_type} disabled readonly/>
                                        </div>
                                        <div className="col-6">
                                                <label className="form-label fw-semibold" htmlFor="phone_number">Número de contacto</label>
                                                <input className="form-control text-capitalize" type="text" value={info.provider_info?.phone} disabled readonly/>
                                        </div>
                                </div>
                                <div className="col-12 pb-2 text-center">
                                        <label className={loading ? 'btn btn-dark rounded-pill' : 'btn btn-secondary rounded-pill'} htmlFor="img_url">{loading ? 'Imagen cargada' : 'Cargar imagen'}</label>
                                        <input className="file-input" onChange={(e) => handleChangeImg(e.target.files)} type="file" name="img_url" id="img_url" accept=".jpg, .png, .jpeg" />
                                </div>
                                <div className="d-flex justify-content-center align-items-center p-2">
                                        <button className="btn-newpost-form text-uppercase rounded-pill" disabled={isDisabled}>Continuar</button>
                                </div>
                        </form>
                </div>
        );
};