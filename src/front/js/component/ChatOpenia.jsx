import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import './styles/chatopenia.css'

// Componente principal ChatOpenia
export const ChatOpenia = () => {
    const { store, actions } = useContext(Context);
    const [open, setOpen] = useState(false); // Controla la visibilidad del chat
    const [message, setMessage] = useState(""); // Para el valor del input de mensajes

    // Cargar los mensajes cuando el componente se monta
    useEffect(() => {
        if (open) {
            actions.getAllMessages(); // Obtener mensajes desde el backend
        }
    }, [open]);

    // Manejar el envío de mensajes
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            const result = await actions.createNewMessage(message);// Enviar el mensaje al backend
            setMessage(""); // Limpiar el input
        }
    };

    return (
        <div className="assistant-button p-3">
            {/* Botón para abrir/cerrar el chat solo si el chat está cerrado */}
            {!open && (
                <button onClick={() => setOpen(true)} className="btn btn-primary mb-2">
                    ¿Cómo te puedo ayudar?
                </button>
            )}

            {/* Mostrar el chat solo cuando está abierto */}
            {open && (
                <div className="card shadow-lg" style={{ width: '400px', height: '500px' }}>
                    <div className="card-header d-flex justify-content-between">
                        <h5>Chat Asistente</h5>
                        <button className="btn btn-danger" onClick={() => setOpen(false)}>
                            X
                        </button>
                    </div>

                    {/* Contenedor de mensajes */}
                    <div className="card-body overflow-auto" style={{ maxHeight: '350px' }}>
                        <div className="d-flex flex-column gap-2">
                            {/* Asegúrate de tener mensajes en el store antes de mapear */}
                            {store?.messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}
                                >
                                    <div
                                        className={`p-2 rounded ${msg.role === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}
                                        style={{ maxWidth: "80%" }}
                                    >
                                        {/* Si el mensaje es del usuario */}
                                        {msg.role === "user" ? (
                                            JSON.parse(msg.content).text // Mostrar el mensaje del usuario
                                        ) : (
                                            <>
                                                {/* Manejar si es JSON válido */}
                                                {JSON.parse(msg.content).text}
                                                {/* Si hay contactos en el mensaje */}
                                                {JSON.parse(msg.content).contacts && (
                                                    <div className="d-flex flex-column gap-2">
                                                        {JSON.parse(msg.content).contacts.map((contact, idx) => (
                                                            <div key={idx} className="bg-light p-2 rounded">
                                                                <a className="d-flex gap-2" href="#">
                                                                    <span role="img" aria-label="phone">📞</span>
                                                                    {contact.name} - {contact.phone}
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulario para enviar mensajes */}
                    <div className="card-footer">
                        <form onSubmit={handleSubmit} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Escribe un mensaje"
                            />
                            <button type="submit" className="btn btn-primary">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
