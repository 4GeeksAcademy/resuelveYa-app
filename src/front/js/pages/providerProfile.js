import React from "react";
import { UserDetails } from "../component/UserDetails";
import { ProviderServiceHistory } from "../component/ProviderServiceHistory";
import { ProviderPostHistory } from "../component/ProviderPostHistory";

export const ProviderProfile = () => {
	return (
        <div className="d-flex justify-content-center p-5 bg-light">
            <UserDetails/>
            <ProviderServiceHistory/>
            <ProviderPostHistory/>
        </div>
	);
};