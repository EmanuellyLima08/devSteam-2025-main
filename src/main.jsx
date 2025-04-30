import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import { formatarMoeda } from "./utils/formatters.js";
import { AuthProvider } from "./context/AuthContext";
import MainRoutes from "./components/MainRoutes"; // Importa o MainRoutes

export const GlobalContext = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalContext.Provider value={{ formatarMoeda }}>
      <AuthProvider>
        <BrowserRouter>
          <MainRoutes /> {/* Usa o MainRoutes aqui */}
        </BrowserRouter>
      </AuthProvider>
    </GlobalContext.Provider>
  </React.StrictMode>
);
