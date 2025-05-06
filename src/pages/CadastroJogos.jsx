import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CadastroJogos = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    const usuarioSalvo = JSON.parse(localStorage.getItem("devlogin"));
    if (!usuarioSalvo || usuarioSalvo.role !== "ADMIN") {
      alert("Acesso negado. Apenas administradores podem acessar essa página.");
      navigate("/");
    } else {
      setUsuario(usuarioSalvo);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !genero || !preco) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoJogo = {
      id: Date.now(),
      nome,
      genero,
      preco: parseFloat(preco),
    };

    const jogosSalvos = JSON.parse(localStorage.getItem("jogosDevSteam")) || [];
    jogosSalvos.push(novoJogo);
    localStorage.setItem("jogosDevSteam", JSON.stringify(jogosSalvos));

    alert("Jogo cadastrado com sucesso!");
    setNome("");
    setGenero("");
    setPreco("");
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div
            className="p-4 rounded shadow"
            style={{
              background: "linear-gradient(to right, #1f1f1f, #2c2c2c)",
              color: "#f1f1f1",
              border: "1px solid #333",
            }}
          >
            <h2 className="mb-4 text-center">Cadastro de Jogos</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome do Jogo</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-0"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Gênero</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-0"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control bg-dark text-light border-0"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: "#00b894",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#00a383")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#00b894")}
              >
                Cadastrar Jogo
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroJogos;
