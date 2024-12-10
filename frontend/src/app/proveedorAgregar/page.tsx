"use client";

import React, { useState } from 'react';

const CrearProveedor = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        nombreProveedor: '',
        nombreContacto: '',
        direccionProveedor: '',
        telefonoProveedor: '',
        emailProveedor: '',
    });

    const API_URL = 'http://127.0.0.1:5000/api/proveedores';

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(`Proveedor creado exitosamente: ${result.message}`);
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error de conexión: ${error.message}`);
        }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            margin: '20px',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <form onSubmit={handleSubmit} style={{
                maxWidth: '500px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
                color: 'black',
            }}>
                <h1 style={{ color: 'grey', textAlign: 'center', marginBottom: '20px' }}>Crear Proveedor</h1>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="nombreProveedor" style={{ display: 'block', marginBottom: '5px' }}>Nombre del Proveedor:</label>
                    <input type="text" id="nombreProveedor" value={formData.nombreProveedor} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="nombreContacto" style={{ display: 'block', marginBottom: '5px' }}>Nombre del Contacto:</label>
                    <input type="text" id="nombreContacto" value={formData.nombreContacto} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="direccionProveedor" style={{ display: 'block', marginBottom: '5px' }}>Dirección del Proveedor:</label>
                    <input type="text" id="direccionProveedor" value={formData.direccionProveedor} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="telefonoProveedor" style={{ display: 'block', marginBottom: '5px' }}>Teléfono del Proveedor:</label>
                    <input type="tel" id="telefonoProveedor" value={formData.telefonoProveedor} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="emailProveedor" style={{ display: 'block', marginBottom: '5px' }}>Email del Proveedor:</label>
                    <input type="email" id="emailProveedor" value={formData.emailProveedor} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                </div>

                <button type="submit" style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                }}>Crear Proveedor</button>

                {message && (
                    <div style={{ marginTop: '20px', fontSize: '1rem', color: message.startsWith('Error') ? 'red' : 'green' }}>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CrearProveedor;
