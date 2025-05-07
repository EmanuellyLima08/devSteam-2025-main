import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext";

const LoginCadastro = () => {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [souAdmin, setSouAdmin] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modoCadastro) {
      if (nome && email && senha) {
        const novoUsuario = {
          nome,
          email,
          senha,
          role: souAdmin ? "ADMIN" : "CLIENTE",
        };
        try {
          localStorage.setItem("devlogin", JSON.stringify(novoUsuario));
          alert("Cadastro realizado com sucesso!");
          setModoCadastro(false);
          setNome("");
          setEmail("");
          setSenha("");
          setSouAdmin(false);
        } catch (error) {
          console.error("Erro ao salvar no localStorage:", error);
          alert("Ocorreu um erro ao salvar os dados. Tente novamente.");
        }
      } else {
        alert("Preencha todos os campos!");
      }
    } else {
      try {
        const usuarioSalvo = JSON.parse(localStorage.getItem("devlogin"));
        if (
          usuarioSalvo &&
          usuarioSalvo.email === email &&
          usuarioSalvo.senha === senha
        ) {
          await login(usuarioSalvo);
          navigate("/");
        } else {
          alert("E-mail ou senha incorretos!");
        }
      } catch (error) {
        console.error("Erro ao acessar o localStorage:", error);
        alert("Ocorreu um erro ao acessar os dados. Tente novamente.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#1a1125" }} // Fundo principal
    >
      <div
        className="card shadow p-4 rounded-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#2c1a47", // Fundo secundário
          color: "#f1f1f1", // Texto principal
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#9d4edd" }}>
          {modoCadastro ? "Criar Conta" : "Entrar"}
        </h3>

        <form onSubmit={handleSubmit}>
          {modoCadastro && (
            <>
              <div className="form-floating mb-3">
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="form-control border-0 rounded-3"
                  style={{
                    backgroundColor: "#3c2a58",
                    color: "#f1f1f1",
                  }}
                  type="text"
                  id="frmNome"
                  placeholder="Nome"
                />
                <label htmlFor="frmNome" style={{ color: "#bfa8d6" }}>
                  Nome
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="souAdminCheck"
                  checked={souAdmin}
                  onChange={(e) => setSouAdmin(e.target.checked)}
                  style={{ backgroundColor: "#3c2a58", borderColor: "#9d4edd" }}
                />
                <label
                  className="form-check-label"
                  htmlFor="souAdminCheck"
                  style={{ color: "#bfa8d6" }}
                >
                  Sou Admin
                </label>
              </div>
            </>
          )}

          <div className="form-floating mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control border-0 rounded-3"
              style={{
                backgroundColor: "#3c2a58",
                color: "#f1f1f1",
              }}
              type="email"
              id="frmEmail"
              placeholder="E-mail"
            />
            <label htmlFor="frmEmail" style={{ color: "#bfa8d6" }}>
              E-mail
            </label>
          </div>

          <div className="form-floating mb-4">
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-control border-0 rounded-3"
              style={{
                backgroundColor: "#3c2a58",
                color: "#f1f1f1",
              }}
              type="password"
              id="frmSenha"
              placeholder="Senha"
            />
            <label htmlFor="frmSenha" style={{ color: "#bfa8d6" }}>
              Senha
            </label>
          </div>

          <button
            className="btn w-100 rounded-3 mb-3"
            style={{
              backgroundColor: "#9d4edd", // Cor de destaque
              color: "#f1f1f1",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#c77dff") // Hover
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#9d4edd") // Volta ao normal
            }
          >
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>

          <div className="text-center">
            <small style={{ color: "#bfa8d6" }}>
              {modoCadastro ? "Já tem conta?" : "Não tem conta?"}{" "}
              <button
                type="button"
                onClick={() => setModoCadastro(!modoCadastro)}
                className="btn btn-link p-0"
                style={{
                  color: "#9d4edd",
                  textDecoration: "underline",
                }}
              >
                {modoCadastro ? "Entrar" : "Criar conta"}
              </button>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCadastro;
