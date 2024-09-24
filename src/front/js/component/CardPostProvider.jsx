import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "./styles/cardPostProvider.css"
import { SearchFilter } from "./SearchFilter.jsx";
// import './styles/jumbotron.css'

export const CardPostProvider = () => {
    const { store, actions } = useContext(Context)
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    console.log(store.reviews)
    const [rankings, setRankings] = useState({})

    const handlerRating = async (index, postId) => {
        const newRanking = index + 1
        setRankings(prev => ({ ...prev, [postId]: newRanking }))
        console.log(newRanking)
        const data = {
            post_id: postId,
            rating: newRanking,
        }
        await actions.newReview(data)
        console.log(data)

    }

    useEffect(() => {
        actions.getReviews()
        // if( store.listServices.length === 0){
        //     actions.getPostsProviders()
        // }
    }, [])

    return (
        <div className="d-flex flex-column align-items-center" style={{ paddingTop: '100px' }}>

            <SearchFilter title={'¡Encuentra tu solución aquí!'} subTitle={'¡Porque nosotros sí resolvemos!'} />

            {
                store.reviews?.map((item, index) => (
                    <div key={index} className="card mt-3">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-12 col-md-2 py-3 text-center">
                                    <img src={item.post.post_img} alt="" className="photo rounded-circle" />
                                </div>
                                <div className="col-12 col-md-10 d-flex flex-column justify-content-center ps-3">
                                    <div className="row">
                                        <div className="col-12 col-md-9">
                                            <h4 className="m-0 text-capitalize">{item.post.title}</h4>
                                        </div>
                                        {token ?
                                            <div className="col-12 col-md-3 ps-0 text-center">
                                                <i className='bx bxs-phone text-end text-primary fa-lg pt-'></i>{item.post.user_phone}
                                            </div> :
                                            <div className="col-12 col-md-3 ps-0 text-center">
                                                <Link to="/login" className="text-black mb-2">
                                                    <i className='bx bxs-phone text-end text-primary fa-lg pt-'></i> Contacto
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-5 pe-0">
                                            <p className="m-0 fs-5 text-capitalize">{item.post.user_name} {item.post.user_lastname}</p>
                                        </div>
                                        {/* Promedio de calificaciones */}
                                        <div className="col-12 col-md-4 text-center px-0 pt-1">
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
                                        </div>
                                        <div className="col-12 col-md-3 p-0 text-center pt-1">
                                            <p className="m-0"><small>{item.average_rating} ({item.total_rating} calificaciones)</small></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-3">
                                            <p className="m-0 text-capitalize fw-semibold">{item.post.service_type}</p>
                                        </div>
                                        <div className="col-12 col-md-3">
                                            <i className="fa-solid fa-location-dot text-center"></i>{item.post.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Descripcion y imagen del post */}
                        <div className="card-body p-3">
                            <div className="row">
                                <div className="col-12 col-md-9">
                                    <p className="card-text p-2">{item.post.description}</p>
                                </div>
                                <div className="col-12 col-md-3 text-center">
                                    <img src={item.post.post_img} alt="" className="photo border-2" />
                                </div>
                            </div>
                        </div>
                        <hr className="m-0"></hr>
                        {/* Boton comentar y calificar */}
                        <div className="card-body px-4 p-2">
                            <div className="row text-center">
                                {token ?
                                    <div className="col-12 col-md-6">
                                        <button type="button" className="btn btn-light">
                                            <div className="row">
                                                <div className="col-3">
                                                    <i className='bx bx-comment-detail fa-lg pt-1 text-primary'></i>
                                                </div>
                                                <div className="col-9 ps-0">
                                                    Comentar
                                                </div>
                                            </div>
                                        </button>
                                    </div> :
                                    <div className="col-12 col-md-6">
                                        <Link to="/login" className="text-black mb-2">
                                            <button type="button" className="btn btn-light">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <i className='bx bx-comment-detail fa-lg pt-1 text-primary'></i>
                                                    </div>
                                                    <div className="col-9 ps-0">
                                                        Comentar
                                                    </div>
                                                </div>
                                            </button>
                                        </Link>
                                    </div>
                                }
                                {/* calificar */}
                                {token ?
                                    <div className="col-12 col-md-6 pt-2"> Calificar
                                        {
                                            [... new Array(5)].map((_, indx) => {
                                                const isRated = rankings[item.post.id] > indx; //verificar si la estrella esta calificada
                                                return isRated ?
                                                    <i className='bx bxs-star text-primary fa-lg'
                                                        key={indx}
                                                        onClick={() => handlerRating(indx, item.post.id)}>
                                                    </i> :
                                                    <i className='bx bx-star fa-lg'
                                                        key={indx}
                                                        onClick={() => handlerRating(indx, item.post.id)}>
                                                    </i>
                                            })
                                        }
                                    </div> :
                                    <div className="col-12 col-md-6 pt-2">
                                        <Link to="/login" className="text-black mb-2">
                                            <div>
                                                <i className='bx bx-star fa-lg'></i>
                                                <i className='bx bx-star fa-lg'></i>
                                                <i className='bx bx-star fa-lg'></i>
                                                <i className='bx bx-star fa-lg'></i>
                                                <i className='bx bx-star fa-lg'></i>
                                                Calificar
                                            </div>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                        <hr className="m-0"></hr>
                        {/* Box para agregar comentarios */}
                        <div className="card-body row px-4">
                            <div className="col-md-2">
                                <img src={item.post.post_img} alt="" className="profile-image-client rounded-circle" />
                            </div>
                            {/* <div className="col-md-8">
                                <p className="m-0">{name}</p>
                                <input className="form-control w-100" type="text" placeholder="Escribe un comentario" aria-label="default input example" />
                            </div> */}
                            <div className="col-md-10 form-floating mb-3 border rounded-2">
                                <input type="text" className="form-control-plaintext" id="floatingPlaintextInput" />
                                <label htmlFor="floatingPlaintextInput">{name}</label>
                                <div className="text-end pb-3">
                                    <span className="btn-link text-black" type="submit" id="basic-addon2">Enviar</span>
                                </div>
                            </div>
                        </div>
                        <hr className="m-0 pb-3"></hr>
                        {/* Comentarios del post */}
                        {
                            item.comment.map((comment, index) => (
                                <div className="card-body row px-4 py-0" key={index}>
                                    {/* <div className="col-md-1">
                                    <img src={item.post.post_img} alt="" className="profile-image-client rounded-circle" />
                                    </div> */}
                                    <div className="col-md-12 form-floating mb-3 border rounded">
                                        <input value={comment} type="text" className="form-control-plaintext" id="floatingPlaintextInput" readOnly />
                                        <label htmlFor="floatingPlaintextInput">Nombre de quien hizo el comentario</label>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                ))
            }
        </div>
    );
};
