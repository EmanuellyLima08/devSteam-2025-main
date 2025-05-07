import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const salvaUsuario = localStorage.getItem("devlogin");
    if (salvaUsuario) {
      setUsuario(JSON.parse(salvaUsuario));
    }
  }, []);

  return (
    <header
      className="navbar navbar-dark d-flex align-items-center justify-content-between px-4"
      style={{
        backgroundColor: "#1B0A2A", // Fundo escuro roxo
        height: "80px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* LOGO COM IMAGEM FUTURISTA */}
      <div
        id="logo"
        role="button"
        className="d-flex align-items-center"
        style={{ gap: "10px" }}
      >
        <div>
          <img
            src="/src/img/logo-dev-steam.png"
            style={{ width: "45px", height: "45px", objectFit: "contain" }}
          />
        </div>
        <span className="fw-bold fs-3 text-light">DevSteam</span>
      </div>

      {/* BARRA DE PESQUISA CENTRALIZADA */}
      <div className="d-flex w-50 justify-content-center">
        <input
          type="text"
          className="form-control rounded-pill px-4 text-light"
          placeholder="Buscar games"
          style={{
            maxWidth: "400px",
            backgroundColor: "#824FD1",
            border: "2px solid #824FD1",
            color: "#fff", // Texto digitado branco
            fontSize: "1rem",
            padding: "8px 12px",
          }}
        />
      </div>

      <style jsx="true">{`
        input::placeholder {
          color: white !important; /* Agora o placeholder "Buscar games" ficará branco */
          opacity: 1;
        }
      `}</style>

      {/* PERFIL DO USUÁRIO E CARRINHO */}
      <div className="d-flex align-items-center gap-3">
        {usuario ? (
          <div className="dropdown">
            <div
              role="button"
              className="d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="text-light">
                Olá, {usuario.nome.split(" ")[0]}!
              </span>
              <img
                src={`https://ui-avatars.com/api/?name=${usuario.nome}&background=2b87ae&color=fff`}
                alt={usuario.nome}
                className="rounded-circle"
                width="40"
                height="40"
              />
            </div>
            <ul
              className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="dropdownPerfil"
            >
              {usuario.role === "ADMIN" && (
                <li>
                  <Link to={"/admin/painel"} className="dropdown-item">
                    Painel Administrativo
                  </Link>
                </li>
              )}
              <li>
                <Link to={"/usuario"} className="dropdown-item">
                  Perfil
                </Link>
              </li>
              <li>
                <Link
                  to={"/"}
                  onClick={() => {
                    localStorage.removeItem("devlogin");
                    location.reload();
                  }}
                  className="dropdown-item"
                >
                  Sair
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            role="button"
            className="d-flex gap-2 align-items-center text-decoration-none text-light"
          >
            <i className="bi bi-person-circle fs-3"></i>
            <span className="h6 m-0">Faça login ou cadastre-se</span>
          </Link>
        )}

        {/* ÍCONE DO CARRINHO - MANTIDO COMO ANTES */}
        <div className="position-relative">
          <i
            role="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#carrinhoOffCanvas"
            className="bi bi-cart4 text-light fs-2"
          ></i>
          {props.contadorJogos > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {props.contadorJogos}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
