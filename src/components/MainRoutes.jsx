import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Usuario from "../pages/Usuario";
import Checkout from "../pages/checkout";
import CadastroJogos from "../pages/CadastroJogos";
import App from "../App";

export default function MainRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/usuario"
        element={
          user?.role === "CLIENTE" || user?.role === "ADMIN" ? (
            <Usuario />
          ) : (
            <Navigate to="/login" />
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

      <Route
        path="/cadastroJogos"
        element={
          user?.role === "ADMIN" ? (
            <CadastroJogos />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
