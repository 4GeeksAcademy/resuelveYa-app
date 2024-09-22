import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { UserPersonalData } from "../component/UserPersonalData.jsx";
import { ProviderPostHistory } from "../component/ProviderPostHistory.jsx";

export const UserProfile = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            console.log("este es el user id", user_id)
            actions.getUserInfoById(user_id);
        }
    }, [])

    const handleOut = () => {
        actions.logout()
        navigate("/")
    }
    return (
        <div className="container mt-5 p-5" style={{ backgroundColor: '#f5f5f5' }}>
            <UserPersonalData />
            {store.user?.role === "provider" && <ProviderPostHistory />}
            <button className="btn btn-dark fw-bold text-white mx-auto d-block mt-5" type="submit" onClick={handleOut}>Cerrar sesión</button>
        </div>
    );
};