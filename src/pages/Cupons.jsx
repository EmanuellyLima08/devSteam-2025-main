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
        // Cupons de teste
        const cuponsTeste = [
          {
            id: 1,
            codigo: "DESCONTO10",
            desconto: 10,
            validade: "2025-12-31"
          },
          {
            id: 2,
            codigo: "OFERTA15",
            desconto: 15,
            validade: "2025-11-30"
          },
          {
            id: 3,
            codigo: "PROMO20",
            desconto: 20,
            validade: "2025-10-15"
          }
        ];

        localStorage.setItem("devcupons", JSON.stringify(cuponsTeste));
        setCupons(cuponsTeste);
      }
    } catch (e) {
      console.error("Erro ao ler os cupons:", e);
      localStorage.removeItem("devcupons"); // limpa se estiver corrompido
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

    // Limpar o formulário após adicionar
    setNovoCupom({
      codigo: "",
      desconto: "",
      validade: "",
    });

    // Fechar o modal
    setShowModal(false);
  };

  const confirmarExcluir = () => {
    if (cupomEditando) {
      const cuponsAtualizados = cupons.filter((cupom) => cupom.id !== cupomEditando.id);
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
    <div className="container mt-4">
      <h2>Gerenciar Cupons</h2>

      {/* Card para adicionar novo cupom */}
      <Card className="mb-4" onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
        <Card.Body className="text-center">
          <h5>+ Novo Cupom</h5>
        </Card.Body>
      </Card>

      {/* Modal para adicionar novo cupom */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Cupom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCodigo" className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o código do cupom"
                value={novoCupom.codigo}
                onChange={(e) => setNovoCupom({ ...novoCupom, codigo: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDesconto" className="mb-3">
              <Form.Label>Desconto (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o desconto"
                value={novoCupom.desconto}
                onChange={(e) => setNovoCupom({ ...novoCupom, desconto: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formValidade" className="mb-3">
              <Form.Label>Validade</Form.Label>
              <Form.Control
                type="date"
                value={novoCupom.validade}
                onChange={(e) => setNovoCupom({ ...novoCupom, validade: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddCupom}>
            Adicionar Cupom
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação de excluir */}
      <Modal show={showExcluirModal} onHide={() => setShowExcluirModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Excluir Cupom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o cupom <strong>{cupomEditando?.codigo}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowExcluirModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarExcluir}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edição de cupom */}
      <Modal show={showEditarModal} onHide={() => setShowEditarModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cupom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  setCupomEditando({ ...cupomEditando, desconto: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formValidade" className="mb-3">
              <Form.Label>Validade</Form.Label>
              <Form.Control
                type="date"
                value={cupomEditando?.validade}
                onChange={(e) =>
                  setCupomEditando({ ...cupomEditando, validade: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditarModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={confirmarEditar}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>

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
                    onClick={() => handleEditar(cupom)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleExcluir(cupom)}
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
