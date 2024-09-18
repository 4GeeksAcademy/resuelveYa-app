import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ProviderPostHistory = () => {
        const { store, actions } = useContext(Context)
        console.log(store.listServices)

        useEffect(() => {
                actions.getPostsProviders()
        }, [])
        return (
                <div className="mt-3">
                        <label className="fs-4 pb-3">Mis publicaciones:</label>
                        {
                                store.listServices.map((item, index) => (
                                        <div key={index} className="border p-2">
                                                <div className="row">
                                                        <div className="col-12"><b>{item.service_type}</b></div>
                                                        <div className="col-12"><small>{item.created_at}</small></div>
                                                        <div className="col-6 text-start">{item.service_time}</div>
                                                        <div className="col-6 text-end">S/.{item.price}/h</div>
                                                </div>
                                        </div>
                                ))
                        }
                        <div className="text-end m-0">
                                <Link to="/providernewpost" className="fw-semibold text-black p-0">
                                        <button className="btn btn-light mt-2 fw-semibold border border-black fw-bold" type="submit">Nueva publicación</button>
                                </Link>
                        </div>
                </div>
        );
};