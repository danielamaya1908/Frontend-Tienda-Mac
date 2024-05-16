import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const isLoggedIn = false; // Aquí deberías implementar la lógica para verificar si el usuario ha iniciado sesión

  return isLoggedIn ? element : <Navigate to="/dashboard" />;
}

export default ProtectedRoute;
