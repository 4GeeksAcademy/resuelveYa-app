import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext.js";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TermsConditionsRegister from './TermsConditionsRegister.jsx'; // Importamos el nuevo componente

function RegisterForm() {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false); // Controlar la visibilidad del modal
    const [termsAccepted, setTermsAccepted] = useState(false); // Para aceptar términos y condiciones
    const [roleTerms, setRoleTerms] = useState('client'); // Guardar el rol seleccionado para mostrar términos adecuados
    const [termsError, setTermsError] = useState(""); // Para mostrar el mensaje de error

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            identity_document: "",
            phone: "",
            email: "",
            password: "",
            role: "client",
            category: "",
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .max(15, 'Los nombres deben tener máximo 15 caracteres')
                .required('El nombre es requerido'),
            last_name: Yup.string()
                .max(20, 'Los apellidos deben tener máximo 20 caracteres')
                .required('El apellido es requerido'),
            identity_document: Yup.string()
                .matches(/^\d{8}$/, "El documento de identidad debe tener 8 dígitos")
                .required('El documento de identidad es requerido'),
            phone: Yup.string()
                .matches(/^\d{9}$/, "El teléfono debe tener 9 dígitos")
                .required("El teléfono es requerido"),
            email: Yup.string()
                .email('Correo electrónico inválido')
                .required('El correo electrónico es requerido'),
            password: Yup.string()
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
                .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
                .matches(/\d/, "La contraseña debe contener al menos un número")
                .required("La contraseña es requerida"),
            role: Yup.string()
                .oneOf(['client', 'provider'], 'El rol debe ser "Cliente" o "Proveedor"')
                .required("El rol es requerido"),
            category: Yup.string().when('role', {
                is: 'provider',
                then: schema => schema.required('Debes seleccionar una categoría'),
                otherwise: schema => schema.notRequired()
            }),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!termsAccepted) {
                setTermsError("Aceptar los términos y condiciones es requerido");
                return;
            } else {
                setTermsError(""); // Limpiar el error si se han aceptado los términos
            }

            try {
                const data = await actions.register(values);
                console.log('Respuesta del registro:', data);

                if (data.token) {
                    resetForm();
                    setShowAlert(true);
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
            } catch (e) {
                console.error("Error el registro", e);
            }
        },
    });

    useEffect(() => {
        formik.setFieldValue("role", "client");
    }, []);

    // Cambiar los términos y condiciones según el rol
    const handleRoleChange = (e) => {
        const role = e.target.value;
        formik.setFieldValue("role", role);
        setRoleTerms(role);
        formik.setFieldValue("category", ""); // Limpiar categoría si cambia de proveedor a cliente
    };

    return (
        <div className='rounded-3 border text-black p-5' style={{ maxWidth: "900px" }}>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Usuario creado exitosamente
                </div>
            )}

            <h3 className='mb-4 text-center fw-bold'>Regístrate</h3>

            <form onSubmit={formik.handleSubmit} className='row g-4'>
                {/* Select a rol */}
                <div className="col-5 mb-3">
                    <label htmlFor="role" className="form-label">Regístrate como</label>
                    <select
                        name="role"
                        value={formik.values.role}
                        onChange={handleRoleChange}
                        onBlur={formik.handleBlur}
                        className="form-select"
                        id="role"
                    >
                        <option value="client">Cliente</option>
                        <option value="provider">Proveedor</option>
                    </select>
                    {formik.touched.role && formik.errors.role ? (
                        <div className="text-danger">{formik.errors.role}</div>
                    ) : null}
                </div>

                <div className="col-7 mb-3">
                    <label htmlFor="first_name" className="form-label">Nombres</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        placeholder="Ingresa tus nombres"
                    />
                    {formik.touched.first_name && formik.errors.first_name ? (
                        <div className="text-danger">{formik.errors.first_name}</div>
                    ) : null}
                </div>

                <div className="col-4 mb-3">
                    <label htmlFor="last_name" className="form-label">Apellidos</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        placeholder="Ingresa tus apellidos"
                    />
                    {formik.touched.last_name && formik.errors.last_name ? (
                        <div className="text-danger">{formik.errors.last_name}</div>
                    ) : null}
                </div>

                <div className="col-4 mb-3">
                    <label htmlFor="identity_document" className="form-label">DNI</label>
                    <input
                        id="identity_document"
                        name="identity_document"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.identity_document}
                        placeholder="Ingresa tu DNI"
                    />
                    {formik.touched.identity_document && formik.errors.identity_document ? (
                        <div className="text-danger">{formik.errors.identity_document}</div>
                    ) : null}
                </div>

                <div className="col-4 mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        placeholder="Ingresa tu teléfono"
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-danger">{formik.errors.phone}</div>
                    ) : null}
                </div>

                <div className="col-6 mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        placeholder="Ingresa tu correo electrónico"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="col-6 mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="Ingresa tu contraseña"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>

                {/* Category selector, only enabled if you are a provider */}
                {formik.values.role === "provider" && (
                    <div className="col-6 mb-3">
                        <label htmlFor="category" className="form-label">Categoría de Servicio</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="albañil">Albañil</option>
                            <option value="cocinero">Cocinero</option>
                            <option value="electricista">Electricista</option>
                            <option value="gasfitero">Gasfitero</option>
                            <option value="pintor">Pintor</option>
                            <option value="cerrajero">Cerrajero</option>
                        </select>
                        {formik.touched.category && formik.errors.category ? (
                            <div className="text-danger">{formik.errors.category}</div>
                        ) : null}
                    </div>
                )}

                {/* Términos y condiciones */}
                <div className="col-12 mb-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            id="termsCheck"
                        />
                        <label className="form-check-label" htmlFor="termsCheck">
                            Acepto los{" "}
                            <span
                                className="text-primary"
                                style={{ cursor: "pointer", textDecoration: "underline" }}
                                onClick={() => setShowTermsModal(true)}
                            >
                                términos y condiciones
                            </span>
                        </label>
                    </div>
                    {/* Mensaje de error si no se aceptan los términos */}
                    {termsError && <div className="text-danger mt-1">{termsError}</div>}
                </div>

                <div className='d-flex justify-content-center'>
                    <button
                        type="submit"
                        className="w-100 btn btn-light text-uppercase rounded-pill mt-2"
                    >
                        Registrarme
                    </button>
                </div>
            </form>

            {/* Modal de términos y condiciones */}
            {showTermsModal && (
                <div className="modal d-block">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Términos y Condiciones</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowTermsModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <TermsConditionsRegister role={roleTerms} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowTermsModal(false)}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RegisterForm;
