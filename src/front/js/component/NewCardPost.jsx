import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "./styles/cardPostProvider.css"

export const NewCardPost = ({ item, index }) => {
    const { store, actions } = useContext(Context)
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const [commentData, setCommentData] = useState("")
    const [rankings, setRankings] = useState({})

    const handlerRating = async (index) => {
        const newRanking = index + 1
        setRankings(prev => ({ ...prev, [item.post.id]: newRanking }))
        console.log(newRanking)
        const data = {
            post_id: item.post.id,
            rating: newRanking,
        }
        await actions.newReview(data)
        console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newComment = {
            "post_id": item.post.id,
            "comment": commentData
        }

        try {
            const data = await actions.newReview(newComment)
            setCommentData("")

        } catch (err) {
            console.error("error", err)
        }
    }

    return (
        <div className="card mt-3 w-100">
            <div className="card-header py-3 w-100">
                <div className="row">
                    {/* imagen de perfil del proveedor */}
                    <div className="col-3 col-md-2 ps-2 p-0 mb-3 text-center">
                        <img src={item.post.user_profile || "https://via.placeholder.com/150"} alt="" className="photo rounded-circle w-100" />
                    </div>
                    <div className="col-9 col-md-10 d-flex flex-column justify-content-center ps-3">
                        <div className="row">
                            <div className="col-12 col-md-9 pb-2">
                                <h4 className="m-0 text-capitalize">{item.post.title}</h4>
                            </div>
                            {token ?
                                <div className="col-12 col-md-3 ps-0 pe-0">
                                    <i className='bx bxs-phone text-end text-danger fa-lg pt-'></i>{item.post.user_phone}
                                </div> :
                                <div className="col-12 col-md-3 ps-0 pe-0">
                                    <Link to="/login" className="text-black mb-2">
                                        <i className='bx bxs-phone text-end text-danger fa-lg pt-'></i> Contacto
                                    </Link>
                                </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 pe-0">
                                <p className="m-0 fs-5 text-capitalize">{item.post.user_name} {item.post.user_lastname}</p>
                            </div>
                            {/* Promedio de calificaciones */}
                            <div className="col-12 col-md-7 ps-2 pe-0 pt-1">
                                <p>
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
                                    <small>{item.average_rating} ({item.total_rating} calificaciones)</small>
                                </p>

                            </div>
                            {/* <div className="col-12 col-md-3 ps-2 p-0 pt-1">
                                
                            </div> */}
                        </div>
                        <p className="m-0 text-capitalize text-poscard text-postcard">
                            <span className="fw-bold pe-3">{item.post.service_type}</span>
                            <span className="text-black"><i className="fa-solid fa-location-dot text-danger text-center"></i>{item.post.location}</span>
                        </p>
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
                        <img src={item.post.post_img} alt="" className="photo border-2 w-100" />
                    </div>
                </div>
            </div>
            <hr className="m-0"></hr>
            <div className="card-body px-4 p-2">
                <div className="row text-end">
                    {/* calificar */}
                    {token ?
                        <div className="col-12 col-md-12 pt-2"> Calificar
                            {
                                [... new Array(5)].map((_, indx) => {
                                    const isRated = rankings[item.post.id] > indx; //verificar si la estrella esta calificada
                                    return isRated ?
                                        <i className='bx bxs-star text-postcard fa-lg'
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
                        <div className="col-12 col-md-12 pt-2">
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
            <hr className="m-0 pb-2"></hr>
            {/* Comentarios del post */}
            {
                item.comments.map((comment, index) => (
                    <div className="card-body row px-4 py-0" key={index}>
                        <div className="col-3 col-md-2">
                            <img src={comment.profile_img || "https://via.placeholder.com/150"} alt="" className="profile-image-client rounded-circle" />
                        </div>
                        <div className="col-9 col-md-10 form-floating mb-2 border rounded">
                            <textarea value={comment.comment} type="text" className="form-control-plaintext" id="floatingPlaintextInput" readOnly />
                            <label className="text-primary-emphasis" htmlFor="floatingPlaintextInput">{comment.user_name} {comment.last_name}</label>
                        </div>
                    </div>
                ))
            }
            <hr className="m-0"></hr>
            {/* Box para agregar comentarios */}
            {token &&
                <form className="card-body row px-4 pt-2 pb-3" onSubmit={handleSubmit} >
                    <div className="col-md-12 form-floating pb-1 border rounded-2 pt-4">
                        <textarea type="text"
                            className="form-control-plaintext pt-2 pb-0"
                            id="comment"
                            name="comment"
                            value={commentData}
                            onChange={(e) => setCommentData(e.target.value)}
                        />
                        <label className="text-primary-emphasis" htmlFor="floatingPlaintextInput">{name}, escribe un comentario aqui...</label>
                        <div className="text-end">
                            <button className="btn btn-light text-postcard fw-bold" type="submit" id="comments">Enviar</button>
                        </div>
                    </div>
                </form>
            }
        </div>
    );
};
