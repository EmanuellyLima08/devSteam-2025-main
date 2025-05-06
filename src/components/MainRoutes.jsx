import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import App from "../App";
import Login from "../pages/Login";
import DashBoardAdm from "./DashBoardAdm";
import Categorias from "../pages/Categorias";
import Cupons from "../pages/Cupons";
import Jogos from "../pages/Jogos";
import AdminPainel from "./AdminPainel";
import Usuario from "../pages/Usuario";

export default function MainRoutes() {
  const { loading } = useAuth();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const salvaUsuario = localStorage.getItem("devlogin");
    if (salvaUsuario) {
      setUsuario(JSON.parse(salvaUsuario));
    }
  }, []);

  if (loading) return <p>Carregando...</p>;

  const ProtectedRoute = ({ children, role }) => {
    if (!usuario) {
      return <Navigate to="/login" />;
    }
    if (role && usuario.role !== role) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas para ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <DashBoardAdm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categorias"
        element={
          <ProtectedRoute role="ADMIN">
            <Categorias />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/cupons"
        element={
          <ProtectedRoute role="ADMIN">
            <Cupons />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/jogos"
        element={
          <ProtectedRoute role="ADMIN">
            <Jogos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/painel"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminPainel />
          </ProtectedRoute>
        }
      />

      {/* Rota protegida para usuário CLIENTE */}
      <Route
        path="/usuario"
        element={
          <ProtectedRoute role="CLIENTE">
            <Usuario />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
