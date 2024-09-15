import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "./styles/sendCodeForm.css"

export const SendCodeForm = () => {
    const{store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const handleData = (e) =>{
        setEmail(e.target.value)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            console.log(email)
            // await actions.sendCode(email)
            setEmail("")
            navigate("/newPassword")
        } catch (e) {
            console.error(e)
        }
    }
	return (
        <div className="code text-center bg-white rounded-3 p-4 border border-dark-subtle">
            <h3 className="mb-3"><i className="fa-solid fa-unlock-keyhole"></i> Restablecer contraseña</h3>
            <p className="text-start my-3"><small>Ingresa tu correo electrónico y te enviaremos las instrucciones para una nueva contraseña.</small></p>
            <form className="row g-3 text-start" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
                    <input value={email} name="email" type="email" className="form-control" id="email" placeholder="Ingresa un correo electrónico" onChange={handleData} required />
                </div>
                <div className="col-md-12 mt-4">
                    <button className="btn btn-light w-100 mt-2 fw-semibold border border-black fw-bold" type="submit">Continuar</button>
                </div>
            </form>
            <div className="mt-4 p-0">
                <Link to="/newPassword" className="text-black fw-semibold">Ya tengo el código verificador</Link>
            </div>
        </div>
	);
};