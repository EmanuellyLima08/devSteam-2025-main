import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import App from "../App";
import Header from "../components/Header";
import Login from "../pages/Login";
import DashBoardAdm from "./DashBoardAdm";
import Categorias from "../pages/Categorias";
import Cupons from "../pages/Cupons";
import Jogos from "../pages/Jogos";
import AdminPainel from "./AdminPainel";
import Usuario from "../pages/Usuario";
import Checkout from "../pages/Checkout"; // Adicionado para corrigir o erro

export default function MainRoutes() {
  const { usuario, loading } = useAuth();
  const location = useLocation();


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
    <>
    {/* Renderiza o Header diferente para a rota "/" */}
    {location.pathname === "/" ? (
        <Header contadorJogos={0} />
      ) : (
        <Header />
      )}

    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      {/* Rota de Checkout adicionada */}
      <Route path="/checkout" element={<Checkout />} />

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
      <Route
        path="/admin/gerenciarcupons"
        element={
          <ProtectedRoute role="ADMIN">
            <Cupons />
          </ProtectedRoute>
        }
      />

      {/* Rota protegida para usuário CLIENTE */}
      <Route
        path="/usuario"
        element={
          <ProtectedRoute>
            <Usuario />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}
