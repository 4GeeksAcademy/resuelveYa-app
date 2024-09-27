import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "./styles/providerPostHistory.css";

export const ProviderPostHistory = () => {
        const { store, actions } = useContext(Context)
        console.log(store.providerInfo)

        useEffect(() => {
                actions.getProviderInformation()
        }, [])
        return (
                <div className="posthistory-form-container my-5 p-4">
                        <div className="row m-0">
                                <h3 className="col-md-8 fs-4 ps-0 fw-bold">Mis publicaciones:</h3>
                                <Link to="/providernewpost" className="col-md-4 text-center mb-3">
                                        <button className="btn btn-posthistory rounded-pill text-uppercase shadow" type="submit">Nueva publicación</button>
                                </Link>
                        </div>
                        {store.providerInfo?.service_posts.length === 0 ?
                                <div className="ps-3">
                                        Aún no tienes publicaciones
                                </div>
                                : store.providerInfo?.service_posts.map((item, index) => (
                                        <div key={index} className="card-posthistory p-3 bg-white w-100 m-0 mb-3">
                                                <p><span className='fw-semibold'>Fecha de publicación:</span> {item.created_at}</p>
                                                <div className="row card-header pb-2" >
                                                        <div className="col-4 col-md-2 pe-0 text-center mb-3">
                                                                <img src={item.user_profile || "https://via.placeholder.com/150"} alt="" className="photo rounded-circle w-100" />
                                                        </div>
                                                        <div className="col-8 col-md-10 d-flex flex-column justify-content-center ps-3">
                                                                <div className="row">
                                                                        <div className="col-12 col-md-9">
                                                                                <h4 className="m-0 text-capitalize fw-bold">{item.title}</h4>
                                                                        </div>
                                                                        <div className="col-12 col-md-3 ps-0 text-center">
                                                                                <i className='bx bxs-phone text-end text-danger fa-lg pt-'></i>{item.user_phone}
                                                                        </div>
                                                                </div>
                                                                <div className="col-12 col-md-7 px-0 pt-1">
                                                                        <p className="m-0">
                                                                                <span className="fs-5 text-capitalize pe-3">{item.user_name} {item.user_lastname}</span>
                                                                                {/* Promedio de calificaciones */}
                                                                                {
                                                                                        [... new Array(5)].map((_, indx) => {
                                                                                                const isRated = item.average_rating > indx;
                                                                                                return isRated ?
                                                                                                        <i className='bx bxs-star text-warning fa-lg'
                                                                                                                key={indx}>
                                                                                                        </i> :
                                                                                                        <i className='bx bx-star fa-lg'
                                                                                                                key={indx}>
                                                                                                        </i>
                                                                                        })
                                                                                }
                                                                                <span className="pt-0">( {item.average_rating} )</span>
                                                                        </p>
                                                                </div>
                                                                <div className="pt-2">
                                                                        <p className="m-0 text-posthistory" >
                                                                                <span className="text-capitalize fw-semibold pe-3">{item.service_type}</span>
                                                                                <span className="text-black"><i className="fa-solid fa-location-dot text-center text-danger"></i>{item.location}</span>
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                                <hr className="m-0"></hr>
                                                {/* Descripcion y imagen del post */}
                                                < div className="card-body p-3" >
                                                        <div className="row">
                                                                < div className="col-12 col-md-9" >
                                                                        <p className="card-text p-2">{item.description}</p>
                                                                </div>
                                                                <div className="col-12 col-md-3 text-center">
                                                                        <img src={item.post_img} alt="" className="photo border-2" />
                                                                </div>
                                                        </div>
                                                </div >
                                                <hr className="m-0 pb-2"></hr>
                                                {/* Comentarios del post */}
                                                {
                                                        item.reviews.length === 0 ?
                                                                <div className="card-body ps-3">
                                                                        Aún no tienes comentarios
                                                                </div> :
                                                                item.reviews.map((comment, index) => (
                                                                        <div className="card-body row px-4 py-0" key={index}>
                                                                                <div className="col-md-12 form-floating mb-2 border rounded">
                                                                                        <textarea value={comment.comment} type="text" className="form-control-plaintext" id="floatingPlaintextInput" readOnly />
                                                                                        <label className="fw-semibold text-info-emphasis" htmlFor="floatingPlaintextInput">{comment.user_name} {comment.last_name}</label>
                                                                                </div>
                                                                        </div>
                                                                ))
                                                }
                                        </div>
                                ))

                        }

                </div >

        );
};