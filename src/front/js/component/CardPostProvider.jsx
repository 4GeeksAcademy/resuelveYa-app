import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import "./styles/cardPostProvider.css"
import { SearchFilter } from "./SearchFilter.jsx";
// import './styles/jumbotron.css'

export const CardPostProvider = () => {
    const{store, actions} = useContext(Context)
    const token = localStorage.getItem("token")
    // const name = localStorage.getItem("name")
    console.log(store.reviews)
    const [rankings, setRankings] = useState({})

    const handlerRating = async (index, postId) => {
        const newRanking = index + 1
        setRankings(prev => ({...prev, [postId]: newRanking}))
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

    return(
        <div className="d-flex flex-column align-items-center" style={{paddingTop: '100px'}}>

            <SearchFilter title={'¡Encuentra tu solución aquí!'} subTitle={'¡Porque nosotros sí resolvemos!'}/>
            
            {
                store.reviews?.map((item, index) => (
                    <div key={index} className="card mt-3">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src={item.post.post_img} alt="" className="photo rounded-circle" />
                                </div>
                                <div className="col-md-7 d-flex flex-column justify-content-center">
                                    <h3 className="m-0 text-capitalize">{item.post.title}</h3>
                                    <p className="m-0 fs-4 text-capitalize">{item.post.username} {item.post.lastname}</p>
                                    <p className="m-0 fs-5 text-capitalize fw-semibold">{item.post.service_type}</p>
                                </div>
                                <div className="col-md-3 text-start">
                                    <i className="fa-solid fa-location-dot fa-lg"></i> zona-distrito
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text p-2">{item.post.description}</p>
                        </div>
                        <hr className="m-0"></hr>
                        <div className="card-body px-4">
                            <div className="row">
                                {/* Promedio de calificaciones */}
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-sm-2 text-end">
                                            <p className="fw-bold text-end">{item.average_rating}</p>
                                        </div>
                                        <div className="col-sm-4 text-center">
                                            {
                                                [... new Array(5)].map((_, indx) => {
                                                    const isRated = item.average_rating > indx;
                                                    return isRated ?
                                                        <i className="fa-solid fa-star"
                                                            key={indx}></i> :
                                                        <i className="fa-regular fa-star"
                                                            key={indx}>
                                                        </i>
                                                })
                                            }
                                        </div>
                                        <div className="col-sm-5 text-start">
                                            <p className="fw-bold">{item.total_rating} calificaciones</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5"><i className="fa-solid fa-phone fa-lg"></i> {item.post.phone}</div>
                                {/* <div className="col-md-3"><button type="button" className="btn btn-light"><i className="fa-regular fa-comment fa-xl"></i> Comentar</button></div> */}
                                {/* calificar */}
                                <div className="stars col-md-7 text-end">
                                    {
                                        [... new Array(5)].map((_, indx) => {
                                            const isRated = rankings[item.post.id] > indx; //verificar si la estrella esta calificada
                                            return isRated ?
                                                <i className="fa-solid fa-star"
                                                    key={indx}
                                                    onClick={() => handlerRating(indx, item.post.id)}>
                                                </i> :
                                                <i className="fa-regular fa-star"
                                                    key={indx}
                                                    onClick={() => handlerRating(indx, item.post.id)}>
                                                </i>
                                        })
                                    } calificar
                                </div>
                            </div>
                            {/* <div className="row">
                                <div>
                                    {name}
                                </div>
                                <div className="col-md-9">
                                    <input class="form-control" type="text" placeholder="Escribe un comentario" aria-label="default input example" />
                                </div>
                                <div className="col-md-3">
                                    <i class='bx bx-send fs-3' type="submit"></i>
                                    <button className="btn btn-light mt-2 fw-semibold border border-black fw-bold" type="submit">Enviar</button>
                                </div>
                            </div> */}
                            {/* imagen de quien hizo el comentario
                             <div className="row">
                                <div>
                                    <img src={item.post.post_img} alt="" className="photo rounded-circle" />
                                </div>
                                <div className="col-10 rounded">
                                </div>
                            </div> */}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
