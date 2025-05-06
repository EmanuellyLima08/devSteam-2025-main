import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

const CadastroCupons = () => {
  const [cupons, setCupons] = useState([]);

  // Simulando busca de cupons do localStorage (pode trocar por API)
  useEffect(() => {
    const cuponsSalvos = localStorage.getItem("devcupons");
    if (cuponsSalvos) {
      setCupons(JSON.parse(cuponsSalvos));
    }
  }, []);

  const handleEditar = (id) => {
    alert(`Editar cupom com ID: ${id}`);
    // Aqui você pode abrir um modal ou navegar para a tela de edição
  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este cupom?")) {
      const cuponsAtualizados = cupons.filter((cupom) => cupom.id !== id);
      setCupons(cuponsAtualizados);
      localStorage.setItem("devcupons", JSON.stringify(cuponsAtualizados));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Cupons</h2>
      <div className="row mt-4">
        {cupons.length === 0 ? (
          <p>Nenhum cupom cadastrado.</p>
        ) : (
          cupons.map((cupom) => (
            <div className="col-md-4 mb-4" key={cupom.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{cupom.codigo}</Card.Title>
                  <Card.Text>
                    <strong>Desconto:</strong> {cupom.desconto}% <br />
                    <strong>Validade:</strong> {cupom.validade}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditar(cupom.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleExcluir(cupom.id)}
                  >
                    Excluir
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CadastroCupons;
