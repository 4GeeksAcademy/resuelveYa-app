import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminPanel } from "../component/AdminPanel.jsx";
import { Context } from "../store/appContext";
import "./../component/styles/adminProfile.css";

export const AdminProfile = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate()

    const handleOut = () => {
        actions.logout()
        navigate("/")
    }

    return (
        <div className="container admin-profile p-5 bg-light" >
            <AdminPanel />
            <button className="btn btn-dark fw-bold text-white mx-auto d-block mt-5" type="submit" onClick={handleOut}>Cerrar sesión</button>
        </div>
    );
};
