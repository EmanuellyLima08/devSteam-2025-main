import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router";

const Usuario = () => {
  const [abaAtiva, setAbaAtiva] = useState("dados");
  const [editando, setEditando] = useState(false);
  const [editandoCartao, setEditandoCartao] = useState(false);

  const [nomeUsuario, setNomeUsuario] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [chavePix, setChavePix] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validadeCartao, setValidadeCartao] = useState("");

  const closeLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("devlogin");
    navigate("/");
  };

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("devlogin"));
    if (existingData) {
      setNomeUsuario(existingData.nome || "");
      setDataNascimento(existingData.dataNascimento || "");
      setTelefone(existingData.telefone || "");
      setChavePix(existingData.chavePix || "");
      setEmail(existingData.email || "");
    }
  }, []);

  const editarDados = () => {
    const existingData = JSON.parse(localStorage.getItem("devlogin"));
    if (existingData) {
      setNomeUsuario(existingData.nome || nomeUsuario);
      setDataNascimento(existingData.dataNascimento || dataNascimento);
      setTelefone(existingData.telefone || telefone);
      setChavePix(existingData.chavePix || chavePix);
      setEmail(existingData.email || email);
    }
    setEditando(true);
  };

  const salvaDados = (e) => {
    e.preventDefault();
    setEditando(false);

    const existingData = JSON.parse(localStorage.getItem("devlogin")) || {};

    const updatedData = {
      ...existingData,
      nome: nomeUsuario,
      dataNascimento,
      telefone,
      chavePix,
      email,
    };

    localStorage.setItem("devlogin", JSON.stringify(updatedData));
  };

  const renderCartaoVisual = () => (
    <div
      style={{
        backgroundColor: "#3c2a58",
        padding: "20px",
        borderRadius: "10px",
        color: "#f1f1f1",
        width: "300px",
        height: "180px",
        position: "relative",
      }}
    >
      <div style={{ marginBottom: "20px", fontSize: "18px" }}>💳 Cartão</div>
      <div
        style={{ fontSize: "20px", letterSpacing: "2px", marginBottom: "10px" }}
      >
        {numeroCartao || "•••• •••• •••• ••••"}
      </div>
      <div style={{ fontSize: "14px" }}>NOME</div>
      <div style={{ fontSize: "16px", fontWeight: "bold" }}>
        {nomeCartao || "NOME COMPLETO"}
      </div>
      {validadeCartao && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            fontSize: "14px",
          }}
        >
          Validade {validadeCartao}
        </div>
      )}
    </div>
  );

  const renderConteudo = () => {
    switch (abaAtiva) {
      case "dados":
        return (
          <div>
            <h4 style={{ color: "#9d4edd" }}>Meus Dados</h4>
            {!editando ? (
              <div style={{ color: "#f1f1f1" }}>
                <p><strong>Nome:</strong> {nomeUsuario}</p>
                <p><strong>Data de nascimento:</strong> {dataNascimento}</p>
                <button
                  className="btn"
                  style={{
                    borderColor: "#9d4edd",
                    color: "#9d4edd",
                  }}
                  onClick={() => editarDados()}
                >
                  Editar
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => salvaDados(e)} style={{ color: "#f1f1f1" }}>
                <div className="mb-3">
                  <label className="form-label">Nome completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite seu nome completo"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Digite seu número"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Chave PIX</label>
                  <input
                    type="text"
                    className="form-control"
                    value={chavePix}
                    onChange={(e) => setChavePix(e.target.value)}
                    placeholder="Digite sua chave pix"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#9d4edd", borderColor: "#9d4edd" }}>
                  Salvar
                </button>
              </form>
            )}
          </div>
        );

      case "cartoes":
        return (
          <div style={{ color: "#f1f1f1" }}>
            <h4 style={{ color: "#9d4edd" }}>Cartão</h4>
            <div className="row">
              <div className="col-md-6">
                {!editandoCartao ? (
                  <div>
                    <p><strong>Número:</strong> {numeroCartao || "•••• •••• •••• ••••"}</p>
                    <p><strong>Nome:</strong> {nomeCartao || "NOME COMPLETO"}</p>
                    <p><strong>Validade:</strong> {validadeCartao || "MM/AA"}</p>
                    <button
                      className="btn"
                      style={{
                        borderColor: "#9d4edd",
                        color: "#9d4edd",
                      }}
                      onClick={() => setEditandoCartao(true)}
                    >
                      Editar
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setEditandoCartao(false);
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label">*Número do cartão</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                        value={numeroCartao}
                        onChange={(e) => setNumeroCartao(e.target.value)}
                        maxLength={16}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">*Nome impresso no cartão</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value)}
                        placeholder="NOME COMPLETO"
                      />
                    </div>
                    <div className="mb-3 d-flex gap-3">
                      <div style={{ flex: 1 }}>
                        <label className="form-label">*Validade</label>
                        <input
                          type="text"
                          className="form-control"
                          value={validadeCartao}
                          onChange={(e) => setValidadeCartao(e.target.value)}
                          placeholder="MM/AA"
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="form-label">*Código de segurança</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CVV"
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#9d4edd", borderColor: "#9d4edd" }}>
                      Salvar
                    </button>
                  </form>
                )}
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                {renderCartaoVisual()}
              </div>
            </div>
          </div>
        );

      case "sair":
        return (
          <div>
            <h4 style={{ color: "#9d4edd" }}>Sair da conta?</h4>
            <button className="btn btn-primary" onClick={() => closeLogin()} style={{ backgroundColor: "#ff4dff", borderColor: "#ff4dff" }}>
              Sair
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container-fluid mt-4" style={{ backgroundColor: "#1a1125", minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button
              onClick={() => {
                setAbaAtiva("dados");
                setEditando(false);
              }}
              className={`list-group-item list-group-item-action ${abaAtiva === "dados" ? "active" : ""}`}
              style={{
                backgroundColor: abaAtiva === "dados" ? "#9d4edd" : "#2c1a47",
                color: "#f1f1f1",
                border: "none",
              }}
            >
              Editar Meus Dados
            </button>
            <button
              onClick={() => {
                setAbaAtiva("cartoes");
                setEditandoCartao(false);
              }}
              className={`list-group-item list-group-item-action ${abaAtiva === "cartoes" ? "active" : ""}`}
              style={{
                backgroundColor: abaAtiva === "cartoes" ? "#9d4edd" : "#2c1a47",
                color: "#f1f1f1",
                border: "none",
              }}
            >
              Cartões
            </button>
            <button
              onClick={() => setAbaAtiva("sair")}
              className="list-group-item list-group-item-action"
              style={{ backgroundColor: "#2c1a47", color: "#ff4dff", border: "none" }}
            >
              Sair
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card p-4 shadow-sm" style={{ backgroundColor: "#2c1a47", color: "#f1f1f1", border: "none" }}>
            {renderConteudo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
