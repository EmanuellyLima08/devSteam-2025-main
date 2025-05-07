import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Button, Form, Modal } from "react-bootstrap";

const CadastroCupons = () => {
  const [cupons, setCupons] = useState([]);
  const [novoCupom, setNovoCupom] = useState({
    codigo: "",
    desconto: "",
    validade: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [showExcluirModal, setShowExcluirModal] = useState(false);
  const [cupomEditando, setCupomEditando] = useState(null);

  useEffect(() => {
    const cuponsSalvos = localStorage.getItem("devcupons");

    try {
      const dados = cuponsSalvos ? JSON.parse(cuponsSalvos) : null;

      if (dados && Array.isArray(dados) && dados.length > 0) {
        setCupons(dados);
      } else {
        const cuponsTeste = [
          {
            id: 1,
            codigo: "DESCONTO10",
            desconto: 10,
            validade: "2025-12-31",
          },
          {
            id: 2,
            codigo: "OFERTA15",
            desconto: 15,
            validade: "2025-11-30",
          },
          {
            id: 3,
            codigo: "PROMO20",
            desconto: 20,
            validade: "2025-10-15",
          },
        ];

        localStorage.setItem("devcupons", JSON.stringify(cuponsTeste));
        setCupons(cuponsTeste);
      }
    } catch (e) {
      console.error("Erro ao ler os cupons:", e);
      localStorage.removeItem("devcupons");
    }
  }, []);

  const handleEditar = (cupom) => {
    setCupomEditando(cupom);
    setShowEditarModal(true);
  };

  const handleExcluir = (cupom) => {
    setCupomEditando(cupom);
    setShowExcluirModal(true);
  };

  const handleAddCupom = () => {
    if (!novoCupom.codigo || !novoCupom.desconto || !novoCupom.validade) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoCupomComId = {
      ...novoCupom,
      id: cupons.length ? cupons[cupons.length - 1].id + 1 : 1,
    };

    const cuponsAtualizados = [...cupons, novoCupomComId];
    setCupons(cuponsAtualizados);
    localStorage.setItem("devcupons", JSON.stringify(cuponsAtualizados));

    setNovoCupom({
      codigo: "",
      desconto: "",
      validade: "",
    });

    setShowModal(false);
  };

  const confirmarExcluir = () => {
    if (cupomEditando) {
      const cuponsAtualizados = cupons.filter(
        (cupom) => cupom.id !== cupomEditando.id
      );
      setCupons(cuponsAtualizados);
      localStorage.setItem("devcupons", JSON.stringify(cuponsAtualizados));
    }
    setShowExcluirModal(false);
  };

  const confirmarEditar = () => {
    if (cupomEditando) {
      const cuponsAtualizados = cupons.map((cupom) =>
        cupom.id === cupomEditando.id ? cupomEditando : cupom
      );
      setCupons(cuponsAtualizados);
      localStorage.setItem("devcupons", JSON.stringify(cuponsAtualizados));
    }
    setShowEditarModal(false);
  };

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#1a1125",
        color: "#f1f1f1",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 className="text-center mb-4" style={{ color: "#9d4edd" }}>
        Gerenciar Cupons
      </h2>

      <Card
        className="mb-4"
        onClick={() => setShowModal(true)}
        style={{
          cursor: "pointer",
          backgroundColor: "#2c1a47",
          color: "#f1f1f1",
          border: "1px solid #9d4edd",
        }}
      >
        <Card.Body className="text-center">
          <h5 style={{ color: "#c77dff" }}>+ Novo Cupom</h5>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}
        >
          <Modal.Title>Adicionar Novo Cupom</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1a1125", color: "#f1f1f1" }}>
          <Form>
            <Form.Group controlId="formCodigo" className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código do cupom"
                value={novoCupom.codigo}
                onChange={(e) =>
                  setNovoCupom({ ...novoCupom, codigo: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDesconto" className="mb-3">
              <Form.Label>Desconto (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o desconto"
                value={novoCupom.desconto}
                onChange={(e) =>
                  setNovoCupom({ ...novoCupom, desconto: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formValidade" className="mb-3">
              <Form.Label>Validade</Form.Label>
              <Form.Control
                type="date"
                value={novoCupom.validade}
                onChange={(e) =>
                  setNovoCupom({ ...novoCupom, validade: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2c1a47" }}>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button
            style={{ backgroundColor: "#9d4edd", border: "none" }}
            onClick={handleAddCupom}
          >
            Adicionar Cupom
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showExcluirModal}
        onHide={() => setShowExcluirModal(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}
        >
          <Modal.Title>Excluir Cupom</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1a1125", color: "#f1f1f1" }}>
          Tem certeza que deseja excluir o cupom{" "}
          <strong style={{ color: "#ff4dff" }}>{cupomEditando?.codigo}</strong>?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2c1a47" }}>
          <Button
            variant="secondary"
            onClick={() => setShowExcluirModal(false)}
          >
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarExcluir}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditarModal}
        onHide={() => setShowEditarModal(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}
        >
          <Modal.Title>Editar Cupom</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1a1125", color: "#f1f1f1" }}>
          <Form>
            <Form.Group controlId="formCodigo" className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                value={cupomEditando?.codigo}
                onChange={(e) =>
                  setCupomEditando({ ...cupomEditando, codigo: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDesconto" className="mb-3">
              <Form.Label>Desconto (%)</Form.Label>
              <Form.Control
                type="number"
                value={cupomEditando?.desconto}
                onChange={(e) =>
                  setCupomEditando({
                    ...cupomEditando,
                    desconto: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formValidade" className="mb-3">
              <Form.Label>Validade</Form.Label>
              <Form.Control
                type="date"
                value={cupomEditando?.validade}
                onChange={(e) =>
                  setCupomEditando({
                    ...cupomEditando,
                    validade: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2c1a47" }}>
          <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
            Fechar
          </Button>
          <Button
            style={{ backgroundColor: "#9d4edd", border: "none" }}
            onClick={confirmarEditar}
          >
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row mt-4">
        {cupons.length === 0 ? (
          <p className="text-center" style={{ color: "#bfa8d6" }}>
            Nenhum cupom cadastrado.
          </p>
        ) : (
          cupons.map((cupom) => (
            <div className="col-md-4 mb-4" key={cupom.id}>
              <Card style={{ backgroundColor: "#3c2a58", color: "#f1f1f1" }}>
                <Card.Body>
                  <Card.Title style={{ color: "#c77dff" }}>
                    {cupom.codigo}
                  </Card.Title>
                  <Card.Text>
                    <strong>Desconto:</strong> {cupom.desconto}% <br />
                    <strong>Validade:</strong> {cupom.validade}
                  </Card.Text>
                  <Button
                    style={{ backgroundColor: "#c77dff", border: "none" }}
                    className="me-2"
                    onClick={() => handleEditar(cupom)}
                  >
                    Editar
                  </Button>
                  <Button
                                    style={{
                                      backgroundColor: "#ff4dff",
                                      borderColor: "#ff4dff",
                                      color: "#fff",
                                    }}
                                    onClick={() => handleExcluir(cupom)}
                                  >
                                    Excluir</Button>
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
