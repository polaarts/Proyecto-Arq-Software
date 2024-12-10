'use client';

import React, { useState } from 'react';

const CrearVenta: React.FC = () => {
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const API_URL = 'http://127.0.0.1:5000/api/venta';

        try {
            // Enviar la solicitud al backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productoId, cantidad }),
            });

            // Procesar la respuesta del backend
            const result = await response.json();
            if (response.ok) {
                setMessage(`Venta creada exitosamente: ${result.message}`);
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error de conexión: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <div className="header">
                <h1>Venta</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="productoId">ID del Producto:</label>
                <input
                    type="text"
                    id="productoId"
                    value={productoId}
                    onChange={(e) => setProductoId(e.target.value)}
                    required
                />

                <label htmlFor="cantidad">Cantidad:</label>
                <input
                    type="number"
                    id="cantidad"
                    value={cantidad}
                    min="1"
                    onChange={(e) => setCantidad(Number(e.target.value))}
                    required
                />

                <button type="submit">Crear Venta</button>
            </form>
            <div className="message" style={{ color: message.includes('Error') ? 'red' : 'green' }}>
                {message}
            </div>

            <style jsx>{`
                /* Asegura que el formulario se vea centrado */
                .form-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    font-family: Arial, sans-serif;
                    background-color: #000; /* Fondo negro */
                    color: #808080; /* Gris para el texto */
                    flex-direction: column; /* Centra el contenido en columnas */
                }

                .header {
                    text-align: center;
                    margin-bottom: 10px; /* Reduje el espacio entre el título y el formulario */
                }

                h1 {
                    color: #808080; /* Título en gris */
                    font-size: 2rem; /* Tamaño del título */
                }

                form {
                    max-width: 400px;
                    width: 100%;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                label {
                    display: block;
                    margin-bottom: 8px;
                    color: #000; /* Negro para las etiquetas */
                }

                input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 12px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 1rem;
                    color: #333;  /* Color de texto oscuro */
                    background-color: #fafafa;
                }

                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    width: 100%;
                }

                button:hover {
                    background-color: #45a049;
                }

                .message {
                    margin-top: 20px;
                    font-size: 1rem;
                    text-align: center;
                    color: #808080; /* Gris para el mensaje */
                }
            `}</style>
        </div>
    );
};

export default CrearVenta;
