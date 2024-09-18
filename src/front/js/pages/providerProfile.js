import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../component/UserDetails.jsx";
import { ProviderServiceHistory } from "../component/ProviderServiceHistory.jsx";
import { ProviderPostHistory } from "../component/ProviderPostHistory.jsx";

export const ProviderProfile = () => {
    const{actions} = useContext(Context)
    const navigate = useNavigate()

    const handleOut = () => {
        actions.logout()
        navigate("/")
    }
	return (
        <div className="d-flex flex-column align-items-center p-5">
            <UserDetails />
            <ProviderServiceHistory />
            <ProviderPostHistory />
            <button className="btn btn-light mt-2 fw-semibold border border-black fw-bold" type="submit" onClick={handleOut}>Cerrar sesión</button>
        </div>
	);
};