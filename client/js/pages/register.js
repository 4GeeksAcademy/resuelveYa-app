import React from "react";
import "../../styles/home.css";
import RegisterForm from "../component/RegisterForm.jsx";

export const Register = () => {
	return (

		<div className="d-flex justify-content-center align-items-center gap-5" style={{ height: "100vh", backgroundColor: "#EEEEEE" }}>
			<RegisterForm />
		</div>
	)
};

