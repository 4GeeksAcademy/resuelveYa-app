import React, {useContext} from "react";
import { Context } from "../store/appContext";
import "./styles/cardPostProvider.css"

export const CardPostProvider = () => {
    const{store} = useContext(Context)
    // console.log(store.listServices)

    return(
        <div className="d-flex flex-column align-items-center">
            {
                store.listServices.map((item, index) => (
                    <div key={index} className="card mt-3">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src="https://via.placeholder.com/75" alt="" className="photo rounded-circle" />
                                </div>
                                <div className="col-md-7 d-flex flex-column justify-content-center">
                                    <h3 className="m-0 text-capitalize">{item.lastname}</h3>
                                    <p className="m-0 fs-5 text-capitalize">{item.service_type}</p>
                                </div>
                                <div className="col-md-3 text-start">
                                    <i className="fa-solid fa-location-dot fa-xl"></i> zona-distrito
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text p-2">{item.description}</p>
                        </div>
                        <hr className="m-0"></hr>
                        <div className="card-body px-4">
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center"><i className="fa-solid fa-phone fa-xl pe-2"></i> {item.phone}</div>
                                {/* <div className="col-md-4"><i className="fa-regular fa-comment fa-xl"></i> Comentar</div> */}
                                <div className="col-md-6 text-end"><button type="button" className="btn btn-light"> Reseñas</button></div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
