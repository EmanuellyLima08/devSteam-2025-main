import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Usuario from "../pages/Usuario";
import Checkout from "../pages/checkout";
import App from "../App";

// Página de administrador ainda não criada, mas será usada futuramente
// import AdminPanel from "../pages/adminPanel"; // crie depois

// Componente que define todas as rotas principais da aplicação
export default function MainRoutes() {
  // Obtém o usuário atual e o estado de carregamento da autenticação
  const { user, loading } = useAuth();
  if (loading) return <p>Carregando...</p>;
  return (
    <Routes>
      {/* Rota pública (acessível a qualquer usuário) */}
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas: acessíveis apenas por usuários com papel CLIENTE ou ADMIN */}
      <Route
        path="/usuario"
        element={
          user?.role === "CLIENTE" || user?.role === "ADMIN" ? (
            <Usuario /> // se for CLIENTE ou ADMIN, mostra a página
          ) : (
            <Navigate to="/login" /> // senão, redireciona para login
          )
        }
      />
      <Route
        path="/carrinho"
        element={
          user?.role === "CLIENTE" || user?.role === "ADMIN" ? (
            <Checkout />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Rota protegida: acessível somente por ADMINs */}
      <Route
        path="/admin"
        element={
          user?.role === "ADMIN" ? (
            <AdminPanel /> // mostra painel de admin
          ) : (
            <Navigate to="/login" /> // redireciona se não for admin
          )
        }
      />
    </Routes>
  );
}
