import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { UserPersonalData } from "../component/UserPersonalData.jsx";
import { ProviderPostHistory } from "../component/ProviderPostHistory.jsx";
import PayHistorys from "../component/PayHIstorys.jsx";

export const UserProfile = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            actions.getUserInfoById(user_id);
        }
    }, [])

    const handleOut = () => {
        actions.logout()
        navigate("/")
    }
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center" style={{ width: "100%", marginTop: "100px" }}>
                <UserPersonalData />
                {store.user?.role === "provider" && <ProviderPostHistory />}
                {store.user?.role === 'provider' && <PayHistorys />}
                <button className="btn btn-dark fw-bold text-white mx-auto d-block my-5 " type="submit" onClick={handleOut}>Cerrar sesión</button>
            </div>
        </div>
    );
};