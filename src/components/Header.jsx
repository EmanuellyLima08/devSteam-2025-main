import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = (props) => {
  const { usuario } = useAuth();

  return (
    <header
      className="navbar navbar-dark d-flex align-items-center justify-content-between px-4 px-md-5"
      style={{
        backgroundColor: "#1B0A2A",
        height: "80px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* LOGO */}
      <Link
  to="/"
  id="logo"
  className="d-flex align-items-center ms-4 text-decoration-none"
  style={{ gap: "10px" }}
>
  <div>
    <img
      src="/src/img/logo-dev-steam.png"
      style={{ width: "45px", height: "45px", objectFit: "contain" }}
      alt="Logo DevSteam"
    />
  </div>
  <span className="fw-bold fs-3 text-light">DevSteam</span>
</Link>

      {/* BUSCA (só no desktop) */}
      <div className="d-none d-md-flex w-50 justify-content-center">
        <input
          type="text"
          className="form-control rounded-pill px-4 text-light"
          placeholder="Buscar games"
          style={{
            maxWidth: "400px",
            backgroundColor: "#824FD1",
            border: "2px solid #824FD1",
            color: "#fff",
            fontSize: "1rem",
            padding: "8px 12px",
          }}
        />
      </div>

      <style jsx="true">{`
        input::placeholder {
          color: white !important;
          opacity: 1;
        }

        /* Estilização para o dropdown */
        .dropdown-menu {
          position: absolute;
          top: 55px;
          right: 10px;
          z-index: 9999;
          background-color: #824fd1; /* Cor de fundo roxa */
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          padding: 10px 0;
        }

        .dropdown-item {
          color: #fff !important; /* Texto branco */
          padding: 12px 20px;
          transition: background-color 0.3s ease;
        }

        .dropdown-item:hover {
          background-color: #6a3d8c; /* Tom mais escuro de roxo */
        }

        @media (max-width: 767px) {
          header {
            flex-direction: row !important;
            height: 60px !important;
            padding: 5px 15px !important;
          }

          #logo img {
            width: 35px !important;
            height: 35px !important;
          }

          #logo span {
            display: block !important;
            font-size: 1.2rem !important;
          }

          .user-cart {
            gap: 10px !important;
          }

          .d-none.d-md-inline {
            display: inline-block !important;
          }

          .dropdown-menu {
            position: absolute !important;
            top: 55px !important;
            right: 10px !important;
            z-index: 9999;
            background-color: #824fd1; /* Cor de fundo roxa */
            border-radius: 8px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
            padding: 10px 0;
          }

          .dropdown-item {
            color: #fff !important;
            padding: 12px 20px;
            transition: background-color 0.3s ease;
          }

          .dropdown-item:hover {
            background-color: #6a3d8c; /* Tom mais escuro de roxo */
          }
        }
      `}</style>

      {/* PERFIL E CARRINHO */}
      <div className="d-flex align-items-center gap-4 user-cart">
        {usuario ? (
          <div className="dropdown">
            <div
              role="button"
              className="d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="text-light d-none d-md-inline">
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
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end mt-2">
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
                    window.location.reload();
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
            <span className="h6 m-0 d-none d-md-inline">Login / Cadastro</span>
          </Link>
        )}

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
