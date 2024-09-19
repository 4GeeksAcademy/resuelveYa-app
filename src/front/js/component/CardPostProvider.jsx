import React from "react";
import "./styles/cardPostProvider.css"

export const CardPostProvider = () => (

    <div className="d-flex justify-content-center mt-3">
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-3">
                        <img src="https://via.placeholder.com/75" alt="" className="photo rounded-circle" style={{ width: "75px", height: "75px", objectFit: "cover" }} />
                    </div>
                    <div className="col-md-6">
                        <h3 className="m-0">Danna Paola</h3>
                        <p className="m-0">Electricista</p>
                        <p><small className="text-body-secondary">Hace 5 dias</small></p>
                    </div>
                    <div className="col-md-3 text-start">
                        <p>S/. Precio/h</p>
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
                    <div className="col-md-6"><button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-money-check-dollar fa-xl"></i> Contratar</button></div>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <form>
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Horas contratadas</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label>N. Horas:</label>
                                            </div>
                                            <div className="col-md-9 text-start">
                                                <input className="form-control" type="text" placeholder="Escribe tus horas contratadas" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary border-black" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" className="btn btn-light border-black">Pagar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
