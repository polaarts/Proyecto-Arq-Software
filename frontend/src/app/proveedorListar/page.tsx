"use client";

import React, { useEffect, useState } from "react";

const ListarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000/proveedores";

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProveedores(data);
        } else {
          setError(`Error al cargar los proveedores: ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error de conexión: ${err.message}`);
      }
    };

    fetchProveedores();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        backgroundColor: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          color: "black",
        }}
      >
        <h1
          style={{ color: "grey", textAlign: "center", marginBottom: "20px" }}
        >
          Lista de Proveedores
        </h1>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Nombre
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {proveedor.id}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {proveedor.nombre}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {proveedor.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListarProveedores;
