import React from "react";
import DashBoardAdm from "./DashBoardAdm";

const AdminPainel = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3b0066, #5e0099)", // Gradiente roxo escuro para roxo claro
        padding: "10px 15px 30px", // margens ajustadas para valores menores
        color: "#f5f5f5",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <div className="text-center mb-4">
        <h1
          style={{
            fontSize: "2.3rem",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          DashBoard
        </h1>
        <p style={{ color: "#bbb", fontSize: "1rem" }}>
          Gerencie as seções do site com eficiência e praticidade.
        </p>
      </div>
      <DashBoardAdm />
    </div>
  );
};

export default AdminPainel;
