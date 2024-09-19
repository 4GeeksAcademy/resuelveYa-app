import React from "react";
import "./styles/cardPostProvider.css"

export const CardPostProvider = () => (

    <div className="d-flex flex-column align-items-center">
        <p className="mt-3">valor de la busqueda: #de anuncios</p>
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-3">
                        <img src="https://via.placeholder.com/75" alt="" className="photo rounded-circle" style={{ width: "75px", height: "75px", objectFit: "cover" }} />
                    </div>
                    <div className="col-md-6">
                        <h3 className="m-0">Danna Paola</h3>
                        <p className="m-0 fs-5">Electricista</p>
                    </div>
                    <div className="col-md-3 text-start">
                        podria estar las reseñas?
                    </div>
                </div>
            </div>
            <div className="card-body">
                <p className="card-text p-2">Descripcion</p>
            </div>
            <hr className="m-0"></hr>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6"><button type="button" className="btn btn-light"><i className="fa-regular fa-thumbs-up fa-xl"></i> Me gusta</button></div>
                    {/* <div className="col-md-4"><i className="fa-regular fa-comment fa-xl"></i> Comentar</div> */}
                    <div className="col-md-6"><button type="button" className="btn btn-light"> Reseñas</button></div>
                </div>
            </div>
        </div>
    </div>
);
