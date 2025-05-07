import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DashBoardAdm = () => {
  const [metrics, setMetrics] = useState({
    visitas: 0,
    tempoMedio: "0m",
    conversao: "0%",
    statusServidor: "🔴 Offline",
  });

  const [financialData, setFinancialData] = useState({
    lucro: 0,
    prejuizo: 0,
    jogosMaisVendidos: [],
    jogosMenosVendidos: [],
    vendasMensais: [100, 150, 200, 250, 300, 280],
    notificacoes: [
      "📢 Novo cupom de desconto disponível!",
      "💰 Venda concluída: Cliente XYZ comprou 3 jogos",
      "⚠️ Servidor passará por manutenção amanhã",
    ],
  });

  useEffect(() => {
    fetch("https://api.seusite.com/metrics")
      .then((response) => response.json())
      .then((data) => {
        setMetrics({
          visitas: data.visitasHoje,
          tempoMedio: `${data.tempoMedio} min`,
          conversao: `${data.taxaConversao}%`,
          statusServidor: data.servidorOnline ? "🟢 Online" : "🔴 Offline",
        });
        setFinancialData({
          ...financialData,
          lucro: data.lucro,
          prejuizo: data.prejuizo,
          jogosMaisVendidos: data.jogosMaisVendidos,
          jogosMenosVendidos: data.jogosMenosVendidos,
          notificacoes: data.notificacoes || financialData.notificacoes,
        });
      })
      .catch((error) => console.error("Erro ao carregar métricas:", error));
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #2a003f, #4b0082)",
        minHeight: "80vh",
        width: "95%",
        color: "#fff",
        padding: "30px 15px",
      }}
    >
      <div className="row">
        {/* Menu lateral */}
        <div className="col-md-3">
          <div
            className="list-group shadow-lg p-3 mb-4"
            style={{ borderRadius: "10px", backgroundColor: "#3b0066" }}
          >
            {["categorias", "cupons", "jogos"].map((item, idx) => (
              <Link
                key={idx}
                to={`/admin/${item}`}
                className="list-group-item list-group-item-action text-white text-center"
                style={{
                  backgroundColor: "#5e0099",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "8px",
                  transition: "0.3s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#9b30ff")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#5e0099")
                }
              >
                {item === "categorias"
                  ? "🎮 Gerenciar Categorias"
                  : item === "cupons"
                  ? "💸 Gerenciar Cupons"
                  : "🕹️ Gerenciar Jogos"}
              </Link>
            ))}
          </div>

          {/* Gráfico Coluna - Fundo Branco */}
          <div
            className="card shadow-lg p-3 mb-3 text-center"
            style={{ backgroundColor: "#fff", borderRadius: "10px" }}
          >
            <h6>💰 Lucro vs Prejuízo</h6>
            <div
              className="d-flex justify-content-around align-items-end"
              style={{ height: "100px" }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: `${financialData.lucro}%`,
                    width: "20px",
                    backgroundColor: "#8e44ad",
                    borderRadius: "6px 6px 0 0",
                  }}
                ></div>
                <small className="mt-1 fw-bold d-block">Lucro</small>
                <small>{financialData.lucro}%</small>
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: `${financialData.prejuizo}%`,
                    width: "20px",
                    backgroundColor: "#c0392b",
                    borderRadius: "6px 6px 0 0",
                  }}
                ></div>
                <small className="mt-1 fw-bold d-block">Prejuízo</small>
                <small>{financialData.prejuizo}%</small>
              </div>
            </div>
          </div>

          {/* Gráfico Pizza - Fundo Branco */}
          <div
            className="card shadow-lg p-3 text-center"
            style={{ backgroundColor: "#fff", borderRadius: "10px" }}
          >
            <h6>🎮 Jogos Mais e Menos Vendidos</h6>
            <div
              className="mx-auto my-2"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: `conic-gradient(
                #a569bd 0% ${financialData.jogosMaisVendidos.length * 10}%,
                #f5b7b1 ${financialData.jogosMaisVendidos.length * 10}% 100%
              )`,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#000",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                {financialData.jogosMaisVendidos.length} :{" "}
                {financialData.jogosMenosVendidos.length}
              </div>
            </div>
          </div>
        </div>

        {/* Painel principal */}
        <div className="col-md-9 d-flex flex-column align-items-center">
          <div
            className="card shadow-lg text-center p-4 mb-3"
            style={{
              backgroundColor: "#5e0099",
              color: "#fff",
              borderRadius: "12px",
              width: "90%",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "26px" }}>
              👑 Painel do Administrador
            </h2>
            <p style={{ fontSize: "14px", opacity: 0.9 }}>
              Acesse as ferramentas de gerenciamento do sistema pelo menu.
            </p>
          </div>

          {/* Estatísticas */}
          <div className="row w-75">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="col-md-6 mb-2">
                <div
                  className="card p-3 shadow-lg text-center"
                  style={{
                    backgroundColor: "#3b0066",
                    borderRadius: "10px",
                    color: "#fff",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "scale(1.0)")
                  }
                >
                  <h5>
                    {key === "visitas"
                      ? "👀 Visitas Hoje"
                      : key === "tempoMedio"
                      ? "⏳ Tempo Médio"
                      : key === "conversao"
                      ? "🔄 Taxa de Conversão"
                      : "🖥️ Status do Servidor"}
                  </h5>
                  <h3>{value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Seção de Notificações */}
          <div
            className="p-3 shadow-lg text-center mt-2"
            style={{
              backgroundColor: "#6f42c1",
              borderRadius: "12px",
              color: "#fff",
              width: "75%",
              boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.2)",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#f8e1ff",
              }}
            >
              🔔 Notificações Recentes
            </h4>
            <ul
              className="list-group text-dark"
              style={{
                backgroundColor: "#f5e6ff",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {financialData.notificacoes.map((notificacao, index) => (
                <li
                  key={index}
                  className="list-group-item"
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    backgroundColor: "#ffffff",
                    color: "#6f42c1",
                    borderBottom: "1px solid #d1b2ff",
                  }}
                >
                  {notificacao}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdm;
