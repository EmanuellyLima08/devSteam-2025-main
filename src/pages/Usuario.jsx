import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Usuario = () => {
  // Estados para controle de abas e edição
  const [abaAtiva, setAbaAtiva] = useState("dados");
  const [editando, setEditando] = useState(false);
  const [editandoCartao, setEditandoCartao] = useState(false);

  // Estados para os dados do usuário
  const [nomeUsuario, setNomeUsuario] = useState("Emanuelly Lima");
  const [dataNascimento, setDataNascimento] = useState("25/01/2008");

  // Estados para os dados do cartão
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");

  // Estado para CPF (removido porque não está sendo usado)


  return (
    <div
      className="container py-5"
      style={{
        backgroundColor: "#1b2838",
        color: "#fff",
        minHeight: "100vh",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <div
            className="list-group shadow-lg"
            style={{
              backgroundColor: "#2a475e",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => {
                setAbaAtiva("dados");
                setEditando(false);
              }}
              className={`list-group-item list-group-item-action ${
                abaAtiva === "dados" ? "active" : ""
              }`}
              style={{
                backgroundColor: abaAtiva === "dados" ? "#4c6b22" : "#2a475e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Editar Meus Dados
            </button>
            <button
              onClick={() => {
                setAbaAtiva("cartoes");
                setEditandoCartao(false);
              }}
              className={`list-group-item list-group-item-action ${
                abaAtiva === "cartoes" ? "active" : ""
              }`}
              style={{
                backgroundColor: abaAtiva === "cartoes" ? "#4c6b22" : "#2a475e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Cartões
            </button>
            <button
              onClick={() => setAbaAtiva("sair")}
              className="list-group-item list-group-item-action text-danger"
              style={{
                backgroundColor: "#2a475e",
                color: "#ff4d4d",
                fontWeight: "bold",
              }}
            >
              Sair
            </button>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="col-md-9">
          <div
            className="card p-4 shadow-lg"
            style={{
              backgroundColor: "#2a475e",
              borderRadius: "12px",
              color: "#fff",
            }}
          >
            {/* Aba de Dados */}
            {abaAtiva === "dados" && (
              <div>
                <h4 className="mb-4">Meus Dados</h4>
                {!editando ? (
                  <div>
                    <p>
                      <strong>Nome:</strong> {nomeUsuario}
                    </p>
                    <p>
                      <strong>Data de nascimento:</strong> {dataNascimento}
                    </p>
                    <button
                      className="btn btn-success"
                      onClick={() => setEditando(true)}
                    >
                      Editar
                    </button>
                  </div>
                ) : (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nome completo</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-0"
                        value={nomeUsuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Data de Nascimento</label>
                      <input
                        type="date"
                        className="form-control bg-dark text-light border-0"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => setEditando(false)}
                    >
                      Salvar
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Aba de Cartões */}
            {abaAtiva === "cartoes" && (
              <div>
                <h4 className="mb-4">Cartões</h4>
                {!editandoCartao ? (
                  <div>
                    <p>
                      <strong>Número:</strong> {numeroCartao || "•••• •••• •••• ••••"}
                    </p>
                    <p>
                      <strong>Nome:</strong> {nomeCartao || "NOME COMPLETO"}
                    </p>
                    <button
                      className="btn btn-success"
                      onClick={() => setEditandoCartao(true)}
                    >
                      Editar
                    </button>
                  </div>
                ) : (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Número do cartão</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-0"
                        value={numeroCartao}
                        onChange={(e) => setNumeroCartao(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nome no cartão</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-0"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => setEditandoCartao(false)}
                    >
                      Salvar
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Aba de Sair */}
            {abaAtiva === "sair" && (
              <div>
                <h4 className="mb-4">Sair da conta</h4>
                <button className="btn btn-danger">Sair</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;