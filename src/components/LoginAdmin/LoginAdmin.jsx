import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginAdmin.css"; // Importa el archivo CSS

function LoginAdmin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://backend-tienda-mac-production.up.railway.app/validateUserAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User admin found") {
          onLogin();
          navigate("/7gP4mX!5vZwQj@n8rAe");
        } else {
          alert("Usuario no encontrado o credenciales incorrectas");
        }
      })
      .catch((error) => {
        console.error("Error al validar usuario:", error);
        alert("Error al validar usuario");
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow login-container">
            <div className="card-body">
              <h2 className="card-title-admin text-center mb-4">Login Admin</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label login-form-label">
                    Ingresa usuario:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="usuario@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label login-form-label">
                    Ingresa contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
