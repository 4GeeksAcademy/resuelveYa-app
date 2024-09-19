import React, {useContext} from "react";
import { Context } from "../store/appContext";
import "./styles/cardPostProvider.css"

export const CardPostProvider = () => {
    const{store} = useContext(Context)
    // getPostsProviders()
    console.log(store.listServices)
    
    return(
        <div className="d-flex flex-column align-items-center">
            <p className="mt-3">valor de la busqueda: #de anuncios</p>
            {
                store.listServices.map((item, index) => (
                    <div key={index} className="card mt-3">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src="https://via.placeholder.com/75" alt="" className="photo rounded-circle" />
                                </div>
                                <div className="col-md-6">
                                    <h3 className="m-0 text-capitalize">{item.lastname}</h3>
                                    <p className="m-0 fs-5 text-capitalize">{item.service_type}</p>
                                </div>
                                <div className="col-md-3 text-start">
                                    <i className="fa-solid fa-location-dot fa-xl"></i> ZONA-DISTRITO
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text p-2">{item.description}</p>
                        </div>
                        <hr className="m-0"></hr>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6"><button type="button" className="btn btn-light"><i className="fa-solid fa-phone fa-xl"></i> {item.phone}</button></div>
                                {/* <div className="col-md-4"><i className="fa-regular fa-comment fa-xl"></i> Comentar</div> */}
                                <div className="col-md-6"><button type="button" className="btn btn-light"> Reseñas</button></div>
                            </div>
                        </div>
                    </div>
                    // <div key={index} className="border p-3">
                    //     <div className="row">
                    //         <div className="col-12"><b>{item.service_type}</b></div>
                    //         <div className="col-12"><small></small></div>
                    //         <div className="col-4 text-start">{item.service_timetable}</div>
                    //         <div className="col-4 text-start">{item.service_time}</div>
                    //         <div className="col-4 text-end">S/.{item.price}/h</div>
                    //     </div>
                    // </div>
                ))
            }
        </div>
    );
};
