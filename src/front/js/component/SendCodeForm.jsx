import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./styles/sendCodeForm.css";

export const SendCodeForm = () => {
    // const { actions } = useContext(Context)
    const navigate = useNavigate()

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
                // await actions.sendCode(values)
                resetForm()
                navigate("/newPassword")
            } catch (e) {
                console.error(e)
            }
        },
    });

    return (
        <div className="code text-center bg-white rounded-3 p-4 border border-dark-subtle">
            <h3 className="mb-3"><i className="fa-solid fa-unlock-keyhole"></i> Restablecer contraseña</h3>
            <p className="text-start my-3"><small>Ingresa tu correo electrónico y te enviaremos las instrucciones para una nueva contraseña.</small></p>
            <form className="row g-3 text-start" onSubmit={formik.handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="email" className="form-label fw-semibold">Correo electrónico</label>
                    <input name="email" type="email" className="form-control" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Ingresa un correo electrónico" />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
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