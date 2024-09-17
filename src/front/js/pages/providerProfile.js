import React from "react";
import { UserDetails } from "../component/UserDetails.jsx";
import { ProviderServiceHistory } from "../component/ProviderServiceHistory.jsx";
import { ProviderPostHistory } from "../component/ProviderPostHistory.jsx";

export const ProviderProfile = () => {
	return (
        <div className="d-flex justify-content-center p-5 bg-light">
            <UserDetails/>
            <ProviderServiceHistory/>
            <ProviderPostHistory/>
        </div>
	);
};