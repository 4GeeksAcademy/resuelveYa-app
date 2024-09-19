import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../component/UserDetails.jsx";
import { ProviderServiceHistory } from "../component/ProviderServiceHistory.jsx";
import { ProviderPostHistory } from "../component/ProviderPostHistory.jsx";

export const ProviderProfile = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()

    const handleOut = () => {
        actions.logout()
        navigate("/")
    }
    return (
        <div className="container mt-5 p-5" style={{ backgroundColor: '#f5f5f5' }}>
            <UserDetails />
            <ProviderPostHistory />
            <button className="btn btn-dark fw-bold text-white mx-auto d-block" type="submit" onClick={handleOut}>Cerrar sesión</button>
        </div>
    );
};