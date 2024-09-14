import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "./styles/newPasswordForm.css"

export const NewPasswordForm = () => {
    const{store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [data, setData] = useState({
        code: "",
        password:""
    })
    const handleData = (e) =>{
        let input_value = e.target.value
        let type = e.target.name
        setData({...data, [type]:input_value})
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            console.log(data)
            //crear un actions para ejecutarse
            setData({
                code: "",
                password:""
            })
            navigate("/login")
            
        } catch (e) {
            console.error(e)
        }
    }
	return (
        <div className="password text-center bg-white rounded-3 p-4 border border-dark-subtle">
            <h3 className="mb-3"><i className="fa-solid fa-unlock-keyhole"></i> Restablecer contraseña</h3>
            <p className="m-0"><small>El código verificador fue enviado a:</small></p>
            <p className="mb-3"><small>**correo electrónico**</small></p>
            <form className="row g-3 text-start" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="code" className="form-label fw-semibold">Código verificador</label>
                    <input value={data.code} name="code" type="code" className="form-control" id="code" placeholder="Ingresa un código verificador" onChange={handleData} required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="pass" className="form-label fw-semibold">Nueva contraseña</label>
                    <input value={data.password} name="password" type="password" className="form-control" id="pass" placeholder="Ingresa una nueva contraseña" onChange={handleData} required />
                </div>
                <div className="col-md-12">
                    <button className="btn btn-light w-100 mt-2 fw-semibold border border-black fw-bold" type="submit">Crear</button>
                </div>
            </form>
            <div className="mt-4 p-0">
                <p className="m-0">¿Aun no te llega? Puedes pedir un</p>
                <Link to="/sendVerificationCode" className="text-black fw-semibold">nuevo código verificador</Link>
            </div>
        </div>
	);
};