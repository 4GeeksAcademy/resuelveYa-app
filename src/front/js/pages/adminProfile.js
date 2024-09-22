import React from "react";
import "../../styles/home.css";
import { AdminPanel } from "../component/AdminPanel.jsx";


export const AdminProfile = () => {

    const handleOut = () => {
        actions.logout()
        navigate("/")
    }

    return (
        <div className="container p-5 bg-light" style={{ marginTop: "100px" }}>
            <AdminPanel />
            <button className="btn btn-dark fw-bold text-white mx-auto d-block mt-5" type="submit" onClick={handleOut}>Cerrar sesión</button>
        </div>
    );
};
