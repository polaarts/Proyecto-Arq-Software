'use client';

import React, { useEffect, useState } from 'react';

const ListarVentas: React.FC = () => {
    const [ventas, setVentas] = useState<any[]>([]);
    const [totalVentas, setTotalVentas] = useState<number>(0);

    useEffect(() => {
        // Función para obtener las ventas desde el backend
        const obtenerVentas = async () => {
            const API_URL = 'http://127.0.0.1:5000/api/ventas'; // Ajusta la URL según tu backend

            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                if (response.ok) {
                    setVentas(data.ventas); // Supone que la respuesta tiene una propiedad 'ventas'
                    setTotalVentas(data.totalVentas); // Supone que la respuesta tiene 'totalVentas'
                } else {
                    console.error('Error al obtener ventas:', data.message);
                }
            } catch (error: any) { // Agregamos el tipo 'any' aquí para evitar errores
                console.error('Error de conexión:', error);
            }
        };

        obtenerVentas(); // Llamada inicial para obtener las ventas
    }, []);

    return (
        <div className="ventas-container">
            <h1>Listado de Ventas</h1>
            <div className="total-ventas">
                <p>Total de ventas: {totalVentas}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID del Producto</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <tr key={index}>
                            <td>{venta.productoId}</td>
                            <td>{venta.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .ventas-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    background-color: #f4f4f4;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }

                h1 {
                    color: #808080;
                }

                .total-ventas {
                    margin-bottom: 20px;
                    font-size: 1.2rem;
                    color: #000;
                }

                table {
                    width: 80%;
                    margin-top: 20px;
                    border-collapse: collapse;
                    border: 1px solid #ccc;
                }

                th, td {
                    padding: 8px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }

                th {
                    background-color: #f2f2f2;
                }

                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }

                tr:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
};

export default ListarVentas;
