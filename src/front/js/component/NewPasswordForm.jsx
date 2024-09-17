import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles/newPasswordForm.css"

export const NewPasswordForm = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            code: "",
            password: ""
        },
        validationSchema: Yup.object({
            code: Yup.string()
                .matches(/^\d{6}$/, "El código debe tener 6 dígitos")
                .required("El código es requerido"),
            password: Yup.string()
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
                .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
                .matches(/\d/, "La contraseña debe contener al menos un número")
                // .matches(/[@$!%*?&#]/, "La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, &, #)")
                .required("La contraseña es requerida"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const email = store.resetEmail;

                if (!email) {
                    console.error("No se encontró el email en el store");
                    setErrorMessage("El correo electrónico no se ha encontrado. Solicita un nuevo código.");
                    return;
                }

                const response = await actions.newPassword(email, values.code, values.password);

                if (response.success) {
                    resetForm();
                    navigate("/login");
                } else {
                    setErrorMessage(response.message);
                }
            } catch (error) {
                console.error("Error en el proceso de cambio de contraseña:", error);
                setErrorMessage("Ocurrió un error inesperado.");
            }
        },
    });

    return (
        <div className="password text-center bg-white rounded-3 p-4 border border-dark-subtle">
            <h3 className="mb-3"><i className="fa-solid fa-unlock-keyhole"></i> Restablecer contraseña</h3>
            <p className="m-0"><small>El código verificador fue enviado a:</small></p>
            <p className="mb-3"><strong>{store.resetEmail}</strong></p>

            {/* Display an error message if an error occurs */}
            
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

            <form className="row g-3 text-start" onSubmit={formik.handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="code" className="form-label fw-semibold">Código verificador</label>
                    <input name="code" type="password" className="form-control" id="code" placeholder="Ingresa un código verificador" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.code} />
                    {formik.touched.code && formik.errors.code ? (
                        <div className="text-danger">{formik.errors.code}</div>
                    ) : null}
                </div>
                <div className="col-md-12">
                    <label htmlFor="password" className="form-label fw-semibold">Nueva contraseña</label>
                    <input name="password" type="password" className="form-control" id="password" placeholder="Ingresa una nueva contraseña" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="col-md-12">
                    <button className="btn btn-light w-100 mt-2 fw-semibold border border-black fw-bold" type="submit">Crear</button>
                </div>
            </form>
            <div className="mt-4 p-0">
                <p className="m-0">¿Aun no te llega? Puedes pedir un</p>
                <Link to="/sendVerificationCode" className="text-black fw-semibold">Nuevo código verificador</Link>
            </div>
        </div >
    );
};