import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const UserDetails = () => {
    const { store, actions } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(""); // Para gestionar la imagen
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        dni: "",
        phone: "",
        email: "",
        password: "********" // Mostrar la contraseña encriptada por defecto
    });

    useEffect(() => {
        const getUserData = async () => {
            const user_id = localStorage.getItem('user_id');
            const users = await actions.getUsers();
            const user = users.find(user => user.id === parseInt(user_id));

            if (user) {
                setUserData({
                    first_name: user.username,
                    last_name: user.lastname,
                    dni: user.dni,
                    phone: user.phone,
                    email: user.email,
                    password: "********" // Mostrar la contraseña encriptada
                });
            }
        };
        getUserData();
    }, [actions]);

    const handleEdit = () => {
        setIsEditing(true);
        setUserData({
            ...userData,
            password: "" // Al hacer clic en "Editar", el campo de la contraseña se vuelve editable y vacío
        });
    };

    const handleSave = async () => {
        const updatedData = { ...userData };

        // Si la contraseña no ha sido cambiada, no enviar este campo
        if (!userData.password || userData.password === "********") {
            delete updatedData.password;
        }

        await actions.updateUser(updatedData);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Manejo de la imagen subida
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
        <div className="bg-light" >
            <div className="d-flex justify-content-center p-5 ">
                <div className="d-flex align-items-center">
                    <div className="position-relative">
                        {/* Imagen en círculo */}
                        <img
                            src={image || "https://via.placeholder.com/150"}
                            alt="User"
                            className="rounded-circle img-thumbnail"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        {/* Botón para subir imagen */}
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
            <div className="d-flex justify-content-center p-5">
                <form className="" style={{ width: "900px" }}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Nombres</label>
                            <input
                                type="text"
                                name="first_name"
                                value={userData.first_name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control border-top-0 border-start-0 border-end-0"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                name="last_name"
                                value={userData.last_name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control border-top-0 border-start-0 border-end-0"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={userData.dni}
                                disabled
                                className="form-control border-top-0 border-start-0 border-end-0"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                name="phone"
                                value={userData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control border-top-0 border-start-0 border-end-0"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                disabled
                                className="form-control border-top-0 border-start-0 border-end-0"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Contraseña</label>
                            <input
                                type="password"  // Mostrar la contraseña encriptada
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="form-control border-top-0 border-start-0 border-end-0"
                            />
                        </div>
                    </div>

                    <div className="mt-3">
                        {isEditing ? (
                            <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                        ) : (
                            <button type="button" className="btn btn-secondary" onClick={handleEdit}>Editar</button>
                        )}
                    </div>
                </form>

            </div>
        </div>
    );
};
