import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Usuario from "../pages/Usuario";
import Checkout from "../pages/checkout";
import App from "../App";
// import AdminPanel from "../pages/adminPanel"; // crie depois

export default function MainRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />

      {/* CLIENTE ou ADMIN acessa */}
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

      {/* Somente ADMIN acessa */}
      <Route
        path="/admin"
        element={
          user?.role === "ADMIN" ? <AdminPanel /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}
