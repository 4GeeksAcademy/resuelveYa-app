import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ProviderPostHistory = () => {
        const { store, actions } = useContext(Context)
        console.log(store.providerInfo)

        useEffect(() => {
                actions.getProviderInformation()
        }, [])
        return (
                <div className="mt-3">
                        
                        <div className="d-flex justify-content-between m-0">
                                <label className="fs-4 pb-2">Mis publicaciones:</label>
                                <Link to="/providernewpost" className="fw-semibold text-black mb-2">
                                        <button className="btn btn-light fw-semibold border border-black fw-bold" type="submit">Nueva publicación</button>
                                </Link>
                        </div>
                        {
                                store.providerInfo?.service_posts.map((item, index) => (
                                        <div key={index} className="border p-3">
                                                <div className="row">
                                                        <div className="col-12"><b>{item.service_type}</b></div>
                                                        <div className="col-12"><small></small></div>
                                                        <div className="col-4 text-start">{item.service_timetable}</div>
                                                        <div className="col-4 text-start">{item.service_time}</div>
                                                        <div className="col-4 text-end">S/.{item.price}/h</div>
                                                </div>
                                        </div>
                                ))
                        }
                        {/* <div className="text-end m-0">
                                <Link to="/providernewpost" className="fw-semibold text-black p-0">
                                        <button className="btn btn-light mt-2 fw-semibold border border-black fw-bold" type="submit">Nueva publicación</button>
                                </Link>
                        </div> */}
                </div>
        );
};