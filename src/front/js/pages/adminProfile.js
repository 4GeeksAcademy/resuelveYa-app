import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { AdminPanel } from "../component/AdminPanel.jsx";


export const AdminProfile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center">
            <AdminPanel />
        </div>
    );
};
