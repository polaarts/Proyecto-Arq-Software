"use client";

import React, { useState } from "react";

interface User {
  email: string;
  password: string;
  role: "admin" | "employee";
}

// Datos simulados de usuarios
const mockUsers: User[] = [
  { email: "admin@empresa.com", password: "admin123", role: "admin" },
  { email: "bodega@empresa.com", password: "bodega123", role: "employee" },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<"admin" | "employee" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setRole(user.role);
      setError(null);
    } else {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  const logout = () => {
    setRole(null);
    setEmail("");
    setPassword("");
  };

  const inputStyle = {
    marginTop: "5px",
    padding: "10px",
    width: "300px",
    color: "#333",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222", // Fondo oscuro
    color: "#fff", // Texto blanco
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "10px 20px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#111", // Fondo principal oscuro
      }}
    >
      <div style={formContainerStyle}>
        <h1 style={{ marginBottom: "30px", fontSize: "2rem" }}>
          Sistema de Login
        </h1>

        {!role && (
          <>
            <label
              style={{ marginBottom: "10px", textAlign: "left", width: "100%" }}
            >
              Correo electrónico:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </label>
            <label
              style={{ marginBottom: "10px", textAlign: "left", width: "100%" }}
            >
              Contraseña:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </label>
            <button onClick={handleLogin} style={buttonStyle}>
              Iniciar sesión
            </button>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </>
        )}

        {role && (
          <>
            <h2 style={{ marginBottom: "20px" }}>
              Bienvenido,{" "}
              {role === "admin" ? "Administrador" : "Empleado de Bodega"}.
            </h2>
            {role === "admin" ? (
              <p>Tienes acceso completo para modificar el inventario.</p>
            ) : (
              <p>
                Tienes acceso limitado para consultar y actualizar el stock.
              </p>
            )}
            <button onClick={logout} style={buttonStyle}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
