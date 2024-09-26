import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles/sendCodeForm.css";

export const SendCodeForm = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('Formulario enviado con valores:', values);

            try {
                const result = await actions.sendCode(values.email);

                if (result.success) {
                    resetForm();
                    navigate("/newPassword");
                } else {
                    setErrorMessage(result.message);
                }
            } catch (e) {
                console.error(e);
                setErrorMessage("Error al enviar el código.");
            }
        },
    });

    return (
        <div className="sendcode-form-container text-center rounded-3 p-4">
            <h3 className="mb-3"><i className="fa-solid fa-unlock-keyhole text-black"></i> Restablecer contraseña</h3>
            <p className="text-start my-3"><small>Ingresa tu correo electrónico y te enviaremos un código de verificación.</small></p>

            {/* Display an error message if an error occurs */}
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

            <form className="row g-3 text-start" onSubmit={formik.handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label fw-bold">Correo electrónico</label>
                    <input name="email" type="email" className="form-control" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Ingresa un correo electrónico" />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="col-md-12 mt-4">
                    <button className="btn btn-sendcode text-uppercase rounded-pill mt-2" type="submit">Continuar</button>
                </div>
            </form>
            <div className="mt-4 p-0">
                <Link to="/newPassword" className="text-black fw-semibold">Ya tengo el código verificador</Link>
            </div>
        </div>
    );
};