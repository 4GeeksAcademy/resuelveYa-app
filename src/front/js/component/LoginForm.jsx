import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "./styles/loginForm.css"

export const LoginForm = () => {
    const{actions} = useContext(Context)
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [alert, setAlert] = useState({ visible: false, message: "", type: "" })
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
            let result = await actions.login(data)
            console.log(result)
            // if () {
            //     setData({
            //         email:"",
            //         password:""
            //     })
            //     setAlert({
            //         visible: true,
            //         message: "Iniciaste sesión exitosamente",
            //         type: "success"
            //     });
            //     setTimeout(() => {
            //         navigate("/")
            //     }, 2000)
            // } else {
            //     setAlert({
            //         visible: true,
            //         message: "El correo electrónico o contraseña son incorrectos, intenta nuevamente",
            //         type: "danger"
            //     });
            // }
        } catch (e) {
            console.error(e)
            // setAlert({
            //     visible: true,
            //     message: "Intenta nuevamente",
            //     type: "error"
            // });
        }
    }
    const handleOut = () => {
        actions.logout()
        navigate("/")
    }
	return (
        <div className="login text-center bg-white rounded-3 p-4 border border-dark-subtle">
            {alert.visible && (
                <div className={`alert alert-${alert.type} p-0`} role="alert">
                    {alert.message}
                </div>
            )}
            <h3 className="mb-3">Iniciar sesión</h3>
            <form className="row g-3 text-start" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
                    <input value={data.email} name="email" type="email" className="form-control" id="email" placeholder="Ingresa un correo electrónico" onChange={handleData} required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="pass" className="form-label fw-semibold">Contraseña</label>
                    <input value={data.password} name="password" type="password" className="form-control" id="pass" placeholder="Ingresa una contraseña" onChange={handleData} required />
                </div>
                <div className="text-end m-0">
                    <Link to="/SendVerificationCode" className="fw-semibold text-black p-0">
                        Olvidé mi contraseña
                    </Link>
                </div>
                <div className="col-md-12">
                    <button className="btn btn-light w-100 mt-2 fw-semibold border border-black fw-bold" type="submit">Ingresar</button>
                </div>
            </form>
            <div className="mt-4 p-0">
                <p className="m-0">¿Aun no tienes cuenta? <Link to="/register" className="text-black fw-semibold">Regístrate</Link></p>
            </div>
            <p><a className="nav-link" href="#" onClick={handleOut}>Log Out</a></p>
        </div>
	);
};