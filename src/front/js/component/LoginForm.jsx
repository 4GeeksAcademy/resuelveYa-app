import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "./styles/loginForm.css"

export const LoginForm = () => {
    const{store, actions} = useContext(Context)
    const navigate = useNavigate()
    const [data, setData] = useState({
        email:"",
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
            // await actions.login(data)

            setData({
                email:"",
                password:""
            })
            navigate("/home")
            
        } catch (error) {
            console.error(error)
        }
    }
	return (
        <div className="login text-center bg-white rounded-3 p-4 border border-dark-subtle">
            <h3 className="mb-3">Iniciar sesión</h3>
            <form className="row g-3 text-start" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label fw-semibold">Email</label>
                    <input value={data.email} name="email" type="email" className="form-control" id="email" placeholder="Ingresa un correo electrónico" onChange={handleData} required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="pass" className="form-label fw-semibold">Password</label>
                    <input value={data.password} name="password" type="password" className="form-control" id="pass" placeholder="Ingresa una contraseña" onChange={handleData} required />
                </div>
                <div className="text-end m-0">
                    <Link to="/SendVerificationCode">
                        <button className="btn btn-link fw-semibold text-black p-0">Olvide mi contraseña</button>
                    </Link>
                </div>
                <div className="col-md-12">
                    <button className="btn btn-light w-100 mt-2 fw-semibold border border-black fw-bold" type="submit">Ingresar</button>
                </div>
            </form>
            <div className="mt-4 p-0">
                <p className="m-0">¿Aun no tienes cuenta? <Link to="/register" className="text-black fw-semibold">Regístrate</Link></p>
            </div>
        </div>
	);
};