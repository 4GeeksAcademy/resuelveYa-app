import React from "react";
import { SendCodeForm } from "../component/SendCodeForm.jsx";

export const SendVerificationCode = () => {
	return (
        <div className="d-flex justify-content-center p-5 bg-light">
            <SendCodeForm />
        </div>
	);
};