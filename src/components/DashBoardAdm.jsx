import React from "react";
import { Link } from "react-router-dom";

const DashBoardAdm = () => {
  return (
    <div className="container">
      <h1>Dashboard do Administrador</h1>
      <div className="d-flex flex-column gap-3 mt-4">
        <Link to="/admin/categorias" className="btn btn-primary">
          Gerenciar Categorias
        </Link>
        <Link to="/admin/cupons" className="btn btn-primary">
          Gerenciar Cupons
        </Link>
        <Link to="/admin/jogos" className="btn btn-primary">
          Gerenciar Jogos
        </Link>
      </div>
    </div>
  );
};

export default DashBoardAdm;