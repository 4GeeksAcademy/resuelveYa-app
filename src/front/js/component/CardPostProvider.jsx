import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles/cardPostProvider.css"
import { SearchFilter } from "./SearchFilter.jsx";
// import './styles/jumbotron.css'

export const CardPostProvider = () => {
    const { store, actions } = useContext(Context)
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const role = localStorage.getItem("role")
    const [post_id, setPost_id] = useState()
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

    const handlerId = (item) => {
        setPost_id(item)
        console.log(item)
    }

    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validationSchema: Yup.object({
            comment: Yup.string()
                .min(8, "El comentario debe tener mínimo caracteres")
                .required("No puedes enviar un comentario vacío"),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('Formulario enviado con valores:', JSON.stringify(values, null, 2));
            const data_comment = {
                post_id: post_id,
                comment: values.comment
            }
            // console.log(data_comment)
            try {
                await actions.newReview(data_comment)
                resetForm();

            } catch (e) {
                console.error(e)
            }
        },
    });

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
                                {role=="user" ?
                                    <div className="col-12 col-md-6">
                                        <button type="button" className="btn btn-light" onClick={()=>handlerId(item.post.id)}>
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
                                {role=="user" ?
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
                                    // data-bs-container="body" data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Right popover"
                                    // class="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover"
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
                        <form className="card-body row px-4" onSubmit={formik.handleSubmit}>
                            <div className="col-md-2">
                                <img src={item.post.post_img} alt="" className="profile-image-client rounded-circle" />
                            </div>
                            <div className="col-md-10 form-floating mb-3 border rounded-2">
                                <input type="text" 
                                    className="form-control-plaintext"
                                    id="comment"
                                    name="comment"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.comment}
                                />
                                {formik.touched.comment && formik.errors.comment ? (
                                    <div className="text-danger">{formik.errors.comment}</div>
                                ) : null}
                                <label htmlFor="floatingPlaintextInput">{name}</label>
                                <div className="text-end pb-3">
                                    <button className="btn" type="submit" id="comments">Enviar</button>
                                </div>
                            </div>
                        </form>
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
