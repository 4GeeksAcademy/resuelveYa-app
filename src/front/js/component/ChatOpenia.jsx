import React, { useEffect, useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import './styles/chatopenia.css';

export const ChatOpenia = () => {
    const { store, actions } = useContext(Context);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const messageContainerRef = useRef(null);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (store.username) {
            if (open) {
                actions.getAllMessages();
            }
        }
    }, [open, store.username]);

    const safeParseJSON = (content) => {
        try {
            return JSON.parse(content);
        } catch (error) {
            return content;
        }
    };

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [store.messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            await actions.createNewMessage(message);
            setMessage("");
            scrollToBottom();
        }
    };

    return (
        <div className="assistant-button p-3">
            {store.username && (
                <>
                    {!open && (
                        <button onClick={() => setOpen(true)} className="btn btn-primary mb-2">
                            ¿Cómo te puedo ayudar 😃?
                        </button>
                    )}
                    {open && (
                        <div className="card chat-container">
                            <div className="card-header d-flex justify-content-between">
                                <h5>Chat Asistente</h5>
                                <button className="btn btn-danger" onClick={() => setOpen(false)}>
                                    x
                                </button>
                            </div>
                            <div
                                className="card-body overflow-auto"
                                style={{ maxHeight: '350px' }}
                                ref={messageContainerRef}
                            >
                                <div className="d-flex flex-column gap-2">
                                    {store?.messages?.map((msg, index) => {
                                        const parsedContent = safeParseJSON(msg.content);

                                        return (
                                            <div
                                                key={index}
                                                className={`d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}
                                            >
                                                <div
                                                    className={`p-2 rounded ${msg.role === "user" ? "bg-primary text-white" : "bg-light text-dark"}`}
                                                    style={{ maxWidth: "80%" }}
                                                >
                                                    {msg.role === "user" ? (
                                                        parsedContent.text || parsedContent
                                                    ) : (
                                                        <>
                                                            {parsedContent.text}
                                                            {parsedContent.contacts && (
                                                                <div className="d-flex flex-column gap-2">
                                                                    {parsedContent.contacts.map((contact, idx) => (
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
                                        );
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>
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
                </>
            )}
        </div>
    );
};
