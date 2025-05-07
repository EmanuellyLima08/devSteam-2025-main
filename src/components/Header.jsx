import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
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
            src="/attachments/wBLsn18iHKN6xG2bKDeaP.png"
            alt="Logo Futurista"
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
          color: white !important; /* Agora o placeholder realmente ficará branco */
          opacity: 1;
        }
      `}</style>

      {/* ÍCONE DO CARRINHO */}
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
    </header>
  );
};

export default Header;
