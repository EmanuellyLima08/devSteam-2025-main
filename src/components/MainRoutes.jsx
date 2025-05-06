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
    salvaUsuario && setUsuario(JSON.parse(salvaUsuario));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />

      {/* Somente ADMIN acessa */}
      <Route
        path="/admin"
        element={
          usuario?.role === "ADMIN" ? (
            <DashBoardAdm />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/admin/categorias"
        element={
          usuario?.role === "ADMIN" ? <Categorias /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/cupons"
        element={
          usuario?.role === "ADMIN" ? <Cupons /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/categorias"
        element={
          usuario?.role === "ADMIN" ? <Categorias /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/cupons"
        element={
          usuario?.role === "ADMIN" ? <Cupons /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/jogos"
        element={
          usuario?.role === "ADMIN" ? <Jogos /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/painel"
        element={
          usuario?.role === "ADMIN" ? <AdminPainel /> : <Navigate to="/login" />
          // <AdminPainel />
        }
      />
      <Route path="/usuario" element={<Usuario />} />
    </Routes>
  );
}
