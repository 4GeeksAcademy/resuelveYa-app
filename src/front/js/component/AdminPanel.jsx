import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";

export const AdminPanel = () => {
    const { actions } = useContext(Context);
    const [activeTab, setActiveTab] = useState("clientes");
    const [clients, setClients] = useState([]);
    const [providers, setProviders] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState("");

    useEffect(() => {
        const fetchClients = async () => {
            const clientData = await actions.getUsers("client");
            setClients(clientData);
        };

        const fetchProviders = async () => {
            const providerData = await actions.getUsers("provider");
            setProviders(providerData);
        };

        fetchClients();
        fetchProviders();
    }, [actions]);

    // Función para cambiar el tab activo
    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const handleDelete = async (userId) => {
        const result = await actions.deleteUser(userId);

        if (result.success) {
            if (activeTab === "clientes") {
                setClients(clients.filter(client => client.id !== userId));
                setAlertMessage("Cliente eliminado exitosamente.");
                setAlertType("success");
            } else {
                setProviders(providers.filter(provider => provider.id !== userId));
                setAlertMessage("Proveedor eliminado exitosamente.");
                setAlertType("success");
            }

            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        } else {
            setAlertMessage(`Error al eliminar: ${result.message}`);
            setAlertType("danger");

            setTimeout(() => {
                setAlertMessage(null);
            }, 3000);
        }
    };


    return (
        <div className="p-5" style={{ borderRadius: '10px' }}>
            <h1 className="text-center mb-5">Perfil de Administrador</h1>
            {/* Mostrar alerta condicionalmente */}
            {alertMessage && (
                <div className={`alert alert-${alertType}`} role="alert">
                    {alertMessage}
                </div>
            )}
            <ul className="nav nav-tabs" style={{ marginTop: "70px" }}>
                <li className="nav-item col-6">
                    <a
                        className={`nav-link text-center ${activeTab === "clientes" ? "active" : ""}`}
                        id="clientes-tab"
                        data-bs-toggle="tab"
                        href="#clientes"
                        role="tab"
                        aria-controls="clientes"
                        aria-selected={activeTab === "clientes"}
                        style={{
                            backgroundColor: activeTab === "clientes" ? '#fff' : '#e0e0e0',
                            color: activeTab === "clientes" ? '#000' : '#555'
                        }}
                        onClick={() => changeTab("clientes")}
                    >
                        Lista de Clientes
                    </a>
                </li>
                <li className="nav-item col-6">
                    <a
                        className={`nav-link text-center ${activeTab === "proveedores" ? "active" : ""}`}
                        id="proveedores-tab"
                        data-bs-toggle="tab"
                        href="#proveedores"
                        role="tab"
                        aria-controls="proveedores"
                        aria-selected={activeTab === "proveedores"}
                        style={{
                            backgroundColor: activeTab === "proveedores" ? '#fff' : '#e0e0e0',
                            color: activeTab === "proveedores" ? '#000' : '#555'
                        }}
                        onClick={() => changeTab("proveedores")}
                    >
                        Lista de Proveedores
                    </a>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {/* Tab 1: Lista de Clientes */}
                <div className={`tab-pane fade ${activeTab === "clientes" ? "show active" : ""}`} id="clientes" role="tabpanel" aria-labelledby="clientes-tab">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombres y Apellidos</th>
                                <th>Correo Electrónico</th>
                                <th>Fecha de Registro</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id}>
                                    <td>{`${client.username} ${client.lastname}`}</td>
                                    <td>{client.email}</td>
                                    <td>{client.created_at}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(client.id)}
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tab 2: Lista de Proveedores */}
                <div className={`tab-pane fade ${activeTab === "proveedores" ? "show active" : ""}`} id="proveedores" role="tabpanel" aria-labelledby="proveedores-tab">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombres y Apellidos</th>
                                <th>Correo Electrónico</th>
                                <th>Categoría de Servicio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((provider) => (
                                <tr key={provider.id}>
                                    <td>{`${provider.username} ${provider.lastname}`}</td>
                                    <td>{provider.email}</td>
                                    <td>{provider.service_type}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(provider.id)}
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
