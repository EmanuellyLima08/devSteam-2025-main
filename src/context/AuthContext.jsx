import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === "fake-token") {
      // Login local (offline)
      const usuarioSalvo = JSON.parse(localStorage.getItem("devlogin"));
      if (usuarioSalvo) {
        setUsuario(usuarioSalvo); // mantém o role salvo no objeto original
      }
      setLoading(false);
    } else if (token) {
      // Login real via API
      axios
        .get("https://suaapi.com/usuario/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsuario(res.data); // { nome, role: 'ADMIN' ou 'CLIENTE' }
        })
        .catch(() => {
          setUsuario(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (emailOuUsuario, senha) => {
    if (typeof emailOuUsuario === "object") {
      // Login local
      localStorage.setItem("token", "fake-token");
      localStorage.setItem("devlogin", JSON.stringify(emailOuUsuario));
      setUsuario(emailOuUsuario); // mantém o role do objeto passado
      return;
    }

    // Login real com API
    const res = await axios.post("https://suaapi.com/login", {
      email: emailOuUsuario,
      senha,
    });
    localStorage.setItem("token", res.data.token);
    setUsuario(res.data.usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("devlogin");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
