import React, { useState } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/AuthContext"; // novo hook
// import "../styles/LoginCadastro.css";

const LoginCadastro = () => {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // novo hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modoCadastro) {
      if (nome && email && senha) {
        const novoUsuario = { nome, email, senha, role: "CLIENTE" };
        try {
          localStorage.setItem("devlogin", JSON.stringify(novoUsuario));
          alert("Cadastro realizado com sucesso!");
          setModoCadastro(false);
          setNome("");
          setEmail("");
          setSenha("");
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
          // Salva o usuário no contexto
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
      style={{ backgroundColor: "#2a475e" }}
    >
      <div
        className="card shadow p-4 rounded-4 bg-dark text-white"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">
          {modoCadastro ? "Criar Conta" : "Entrar"}
        </h3>

        <form onSubmit={handleSubmit}>
          {modoCadastro && (
            <div className="form-floating mb-3">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="form-control bg-secondary text-white border-0 rounded-3 placeholder-white"
                type="text"
                id="frmNome"
                placeholder="Nome"
              />
              <label htmlFor="frmNome">Nome</label>
            </div>
          )}

          <div className="form-floating mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-secondary text-white border-0 rounded-3 placeholder-white"
              type="email"
              id="frmEmail"
              placeholder="E-mail"
            />
            <label htmlFor="frmEmail">E-mail</label>
          </div>

          <div className="form-floating mb-4">
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-control bg-secondary text-white border-0 rounded-3 placeholder-white"
              type="password"
              id="frmSenha"
              placeholder="Senha"
            />
            <label htmlFor="frmSenha">Senha</label>
          </div>

          <button className="btn btn-light w-100 rounded-3 mb-3">
            {modoCadastro ? "Cadastrar" : "Entrar"}
          </button>

          <div className="text-center">
            <small className="text-light">
              {modoCadastro ? "Já tem conta?" : "Não tem conta?"}{" "}
              <button
                type="button"
                onClick={() => setModoCadastro(!modoCadastro)}
                className="btn btn-link p-0 text-info"
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
