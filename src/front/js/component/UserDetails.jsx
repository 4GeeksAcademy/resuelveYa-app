import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../store/appContext";

export const UserDetails = () => {
    const { store, actions } = useContext(Context);
    const [image, setImage] = useState("");
    const [isChanged, setIsChanged] = useState(false);

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            phone: "",
            dni: ""
        },
        validationSchema: Yup.object({
            first_name: Yup.string()
                .required("Ingresa un nombre válido")
                .max(20, "El nombre no puede tener más de 20 caracteres"),
            last_name: Yup.string()
                .required("Ingresa un apellido válido")
                .max(20, "El apellido no puede tener más de 20 caracteres"),
            phone: Yup.string()
                .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
                .required("Ingresa un teléfono válido"),
            dni: Yup.string()
                .matches(/^[0-9]{8}$/, "El DNI debe tener 8 dígitos")
                .required("Ingresa un DNI válido")
        }),
        onSubmit: async (values) => {
            const updatedData = { ...values };
            await actions.editUserPersonalData(updatedData);
            setIsChanged(false);
        },
        enableReinitialize: true,
    });

    // Formik para cambiar la contraseña
    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required("Ingresa tu contraseña actual"),
            newPassword: Yup.string()
                .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
                .matches(/[a-z]/, "La nueva contraseña debe contener al menos una letra minúscula")
                .matches(/[A-Z]/, "La nueva contraseña debe contener al menos una letra mayúscula")
                .matches(/\d/, "La nueva contraseña debe contener al menos un número")
                .required("Ingresa una nueva contraseña"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], "Las contraseñas no coinciden")
                .required("Confirma la nueva contraseña"),
        }),
        onSubmit: async (values) => {
            await actions.editUserPassword(values.currentPassword, values.newPassword);
            passwordFormik.resetForm();
        }
    });

    // Detectar cambios en los inputs para habilitar el botón de guardar
    const handleInputChange = (e) => {
        formik.handleChange(e);
        setIsChanged(true);
    };

    useEffect(() => {
        const getUserData = async () => {
            const user_id = localStorage.getItem('user_id');
            if (!user_id) {
                formik.resetForm();
                return;
            }

            const users = await actions.getUsers();
            const user = users.find(user => user.id === parseInt(user_id));

            if (user) {
                formik.setValues({
                    first_name: user.username || "",
                    last_name: user.lastname || "",
                    phone: user.phone || "",
                    dni: user.dni || "",
                    email: user.email || ""
                });
            }
        };
        getUserData();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        <img
                            src={image || "https://via.placeholder.com/150"}
                            alt="User"
                            className="rounded-circle img-thumbnail"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <label className="edit-image-label position-absolute bottom-0 end-0" htmlFor="file-input">
                            <i className="fa fa-edit" />
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            className="d-none"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="ms-4 d-flex align-items-center">
                    <h1>Hola <strong>{store.username}</strong></h1>
                </div>
            </div>

            {/* Bootstrap Tabs */}
            <ul className="nav nav-tabs mt-5 custom-tabs" style={{ borderBottom: 'none' }}>
                <li className="nav-item col-6">
                    <a
                        className="nav-link active text-center text-black"
                        id="datos-personales-tab"
                        data-bs-toggle="tab"
                        href="#datos-personales"
                        role="tab"
                        aria-controls="datos-personales"
                        aria-selected="true"
                    >
                        Datos Personales
                    </a>
                </li>
                <li className="nav-item col-6">
                    <a
                        className="nav-link text-center text-black"
                        id="cambiar-contrasena-tab"
                        data-bs-toggle="tab"
                        href="#cambiar-contrasena"
                        role="tab"
                        aria-controls="cambiar-contrasena"
                        aria-selected="false"
                    >
                        Seguridad
                    </a>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {/* Tab 1: Datos Personales */}
                <div
                    className="tab-pane fade show active"
                    id="datos-personales"
                    role="tabpanel"
                    aria-labelledby="datos-personales-tab"
                >
                    <form onSubmit={formik.handleSubmit} className="p-4" style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                        {/* Formulario de Datos Personales */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Nombres</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formik.values.first_name || ""}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    className="form-control"
                                />
                                {formik.touched.first_name && formik.errors.first_name ? (
                                    <div className="text-danger">{formik.errors.first_name}</div>
                                ) : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Apellidos</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formik.values.last_name || ""}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    className="form-control"
                                />
                                {formik.touched.last_name && formik.errors.last_name ? (
                                    <div className="text-danger">{formik.errors.last_name}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    value={formik.values.dni || ""}
                                    disabled
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formik.values.phone || ""}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    className="form-control"
                                />
                                {formik.touched.phone && formik.errors.phone ? (
                                    <div className="text-danger">{formik.errors.phone}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formik.values.email || ""}
                                    disabled
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <button
                                type="submit"
                                className="btn btn-dark fw-bold text-white"
                                // Deshabilitar el botón hasta que se detecte un cambio
                                disabled={!isChanged}
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tab 2: Cambiar Contraseña */}
                <div
                    className="tab-pane fade"
                    id="cambiar-contrasena"
                    role="tabpanel"
                    aria-labelledby="cambiar-contrasena-tab"
                >
                    <form onSubmit={passwordFormik.handleSubmit} className="p-4" style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
                        {/* Formulario para Cambiar Contraseña */}
                        <div className="form-group mb-3">
                            <label className="fw-bold">Contraseña Actual</label>
                            <input
                                type="password"
                                name="currentPassword"
                                value={passwordFormik.values.currentPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                className="form-control"
                            />
                            {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? (
                                <div className="text-danger">{passwordFormik.errors.currentPassword}</div>
                            ) : null}
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold">Nueva Contraseña</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={passwordFormik.values.newPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                className="form-control"
                            />
                            {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword ? (
                                <div className="text-danger">{passwordFormik.errors.newPassword}</div>
                            ) : null}
                        </div>

                        <div className="form-group mb-3">
                            <label className="fw-bold">Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={passwordFormik.values.confirmPassword}
                                onChange={passwordFormik.handleChange}
                                onBlur={passwordFormik.handleBlur}
                                className="form-control"
                            />
                            {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword ? (
                                <div className="text-danger">{passwordFormik.errors.confirmPassword}</div>
                            ) : null}
                        </div>

                        <button type="submit" className="btn btn-dark fw-bold text-white">Guardar Contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
