import React, {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles/loginForm.css"

export const LoginForm = () => {
    const{actions} = useContext(Context)
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState({ visible: false, message: "", type: "" })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Correo electrónico inválido')
                .required('El correo electrónico es requerido'),
            password: Yup.string()
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .required("La contraseña es requerida"),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('Formulario enviado con valores:', JSON.stringify(values, null, 2));
            try { 
                let result = await actions.login(values)
                if (result.token) {
                    resetForm();
                    setShowAlert({
                        visible: true,
                        message: "Iniciaste sesión exitosamente",
                        type: "success"
                    });
                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                } else {
                    setShowAlert({
                        visible: true,
                        message: "El correo electrónico o contraseña son incorrectos, intenta nuevamente",
                        type: "danger"
                    });
                }
            } catch (e) {
                console.error(e)
            }
        },
    });
    const handleOut = () => {
        actions.logout()
        navigate("/")
    }
	return (
        <div className="login text-center bg-white rounded-3 p-4 border border-dark-subtle">
            {showAlert.visible && (
                <div className={`alert alert-${showAlert.type} p-2`} role="alert">
                    {showAlert.message}
                </div>
            )}
            <h3 className="my-4">Iniciar sesión</h3>
            <form className="row g-3 text-start" onSubmit={formik.handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
                    <input className="form-control" placeholder="Ingresa un correo electrónico"
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="col-md-12">
                    <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                    <input className="form-control" placeholder="Ingresa una contraseña"
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
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
            <p><a className="btn btn-link mt-2" href="#" onClick={handleOut}>Log Out</a></p>
        </div>
	);
};