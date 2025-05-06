import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === "fake-token") {
      // Login local (offline)
      const usuarioSalvo = JSON.parse(localStorage.getItem("devlogin"));
      if (usuarioSalvo) {
        setUser(usuarioSalvo); // mantém o role salvo no objeto original
      }
      setLoading(false);
    } else if (token) {
      // Login real via API
      axios
        .get("https://suaapi.com/usuario/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data); // { nome, role: 'ADMIN' ou 'CLIENTE' }
        })
        .catch(() => {
          setUser(null);
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
      setUser(emailOuUsuario); // mantém o role do objeto passado
      return;
    }

    // Login real com API
    const res = await axios.post("https://suaapi.com/login", {
      email: emailOuUsuario,
      senha,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.usuario);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("devlogin");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
