import React, {useContext, useState} from 'react'
import {Context} from "../store/appContext.js"
import { useNavigate } from 'react-router-dom'

function RegisterForm() {
    const { actions } = useContext(Context)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        identity_document: "", 
        phone: "",
        email: "",
        password: "",
        role: "client",
        category: ""
    })
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const sendFormData = async(e) => {
        e.preventDefault()
        try{
            const data = await actions.register(formData)
            
            if (data?.ok) {
                setFormData({
                    first_name: "",
                    last_name: "",
                    identity_document: "", 
                    phone: "",
                    email: "",
                    password: "",
                    role: "client",
                    category: ""
                });

                setShowAlert(true);

                setTimeout(() => {
                    navigate("/login")
                }, 1500)
            }
        }catch(e){
            console.error("Error in registration", e);
        }
    }

  return (

        <div className='rounded-3 border text-black p-5'style={{width:"600px"}}>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Usuario creado exitosamente
                </div>
            )}

            <h3 className='mb-4 text-center fw-bold'>Regístrate</h3>

            {/* Select a rol*/}
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Regístrate como</label>
                <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange} 
                    className="form-select" 
                    id="role"
                >
                    <option value="client">Cliente</option>
                    <option value="provider">Proveedor</option>
                </select>
            </div>

            <form onSubmit={sendFormData}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Nombres</label>
                    <input type="text" value={formData.first_name} name='first_name' className="form-control" id="firstName" onChange={handleChange} placeholder='Ingresa tus nombres'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Apellidos</label>
                    <input type="text" value={formData.last_name} name='last_name' className="form-control" id="lastName" onChange={handleChange} placeholder='Ingresa tus apellidos'/>
                </div>
                <div className="mb-3">
                <label htmlFor="identityDocument" className="form-label">Documento de Identidad</label>
                <input 
                    type="text" 
                    value={formData.identity_document} 
                    name='identity_document' 
                    className="form-control" 
                    id="identityDocument" 
                    onChange={handleChange}
                    placeholder='Ingresa tu número de DNI'
                />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono</label>
                    <input 
                        type="text" 
                        value={formData.phone} 
                        name='phone' 
                        className="form-control" 
                        id="phone" 
                        onChange={handleChange}
                        placeholder='Ingresa tu teléfono'
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">Correo electrónico</label>
                    <input type="email" value={formData.email} name='email' className="form-control" id="emailAddress" onChange={handleChange} placeholder='Ingresa tu correo electrónico'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordForm" className="form-label">Contraseña</label>
                    <input type="password" value={formData.password} name='password' className="form-control" id="passwordForm" onChange={handleChange} placeholder='Ingresa tu contraseña'/>
                </div>
                {/* Category selector, only enabled if you are a supplier */}
                {formData.role === "provider" && (
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Categoría de Servicio</label>
                        <select 
                            name="category" 
                            value={formData.category} 
                            onChange={handleChange} 
                            className="form-select" 
                            id="category"
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="albañil">Albañil</option>
                            <option value="cocinero">Cocinero</option>
                            <option value="electricista">Electricista</option>
                            <option value="gasfitero">Gasfitero</option>
                            <option value="pintor">Pintor</option>
                            <option value="pintor">Manicurista</option>
                        </select>
                    </div>
                )}
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="w-100 btn btn-light text-uppercase rounded-pill mt-2">Registrarme</button>
                </div>
            </form>
        </div>
    
        
  )
}

export default RegisterForm