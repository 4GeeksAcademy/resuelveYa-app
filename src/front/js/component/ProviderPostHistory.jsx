import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ProviderPostHistory = () => {
        const { store, actions } = useContext(Context)
        // console.log(store.providerInfo)

        useEffect(() => {
                actions.getProviderInformation()
        }, [])
        return (
                <div className="bg-white my-5 p-4 rounded-3" style={{ backgroundColor: '#fff', width: "100%", maxWidth: "900px" }}>

                        <div className="row m-0">
                                <h3 className="col-md-9 fs-4 ps-0 fw-semibold">Mis publicaciones:</h3>
                                <Link to="/providernewpost" className="col-md-3 text-center fw-semibold text-black mb-2">
                                        <button className="btn btn-light fw-semibold border border-black fw-bold" type="submit">Nueva publicación</button>
                                </Link>
                        </div>
                        {
                                store.providerInfo?.service_posts.length === 0 ?
                                        <div>
                                                Aún no tienes publizaciones
                                        </div>
                                        :
                                        store.providerInfo?.service_posts.map((item, index) => (
                                                <div key={index} className="border p-3">
                                                        <p className='m-0'><span className='fw-semibold'>Fecha de publicación:</span> {item.created_at}</p>
                                                        <p className='m-0'><span className='fw-semibold'>Título:</span> {item.title}</p>
                                                        <p className='m-0'><span className='fw-semibold'>Descripción:</span> {item.description}</p>
                                                        <p className='m-0 text-capitalize'><span className='fw-semibold'>Ubicación:</span> {item.location}</p>
                                                        <p className='m-0 text-capitalize'><span className='fw-semibold'>Categoria:</span> {item.service_type}</p>
                                                        <p className='m-0'><span className='fw-semibold'>Número de contacto:</span> {item.user_phone}</p>
                                                </div>
                                        ))

                        }
                </div>

        );
};