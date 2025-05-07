import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const Jogos = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameForm, setGameForm] = useState({ id: null, name: "", image: "" });

  useEffect(() => {
    const gamesSalvos = localStorage.getItem("devgames");
    if (gamesSalvos) {
      setGames(JSON.parse(gamesSalvos));
    }
  }, []);

  const salvarNoStorage = (dados) => {
    localStorage.setItem("devgames", JSON.stringify(dados));
  };

  const handleShowModal = (mode, game = null) => {
    setModalMode(mode);
    setSelectedGame(game);
    setGameForm(
      game || {
        id: Date.now(),
        name: "",
        image: "",
      }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      const atualizados = [...games, gameForm];
      setGames(atualizados);
      salvarNoStorage(atualizados);
    } else if (modalMode === "edit") {
      const atualizados = games.map((g) =>
        g.id === selectedGame.id ? gameForm : g
      );
      setGames(atualizados);
      salvarNoStorage(atualizados);
    }
    handleCloseModal();
  };

  const handleExcluir = (game) => {
    setSelectedGame(game);
    setModalMode("delete");
    setShowModal(true);
  };

  const confirmDelete = () => {
    const atualizados = games.filter((g) => g.id !== selectedGame.id);
    setGames(atualizados);
    salvarNoStorage(atualizados);
    handleCloseModal();
  };

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: "#1a1125", minHeight: "100vh", color: "#f1f1f1" }}
    >
      <h2 className="text-center mb-4" style={{ color: "#9d4edd" }}>
        Gerenciar Jogos
      </h2>

      {/* Botão de novo jogo */}
      <Card
        className="mb-4 text-center"
        onClick={() => handleShowModal("add")}
        style={{
          cursor: "pointer",
          backgroundColor: "#2c1a47",
          color: "#f1f1f1",
          border: "1px solid #9d4edd",
        }}
      >
        <Card.Body>
          <h5 style={{ color: "#c77dff" }}>+ Novo Jogo</h5>
        </Card.Body>
      </Card>

      <div className="row">
        {games.map((game) => (
          <div className="col-md-4 mb-4" key={game.id}>
            <Card
              style={{
                backgroundColor: "#3c2a58",
                color: "#f1f1f1",
                border: "1px solid #9d4edd",
              }}
            >
              {game.image && (
                <Card.Img
                  variant="top"
                  src={game.image}
                  alt={game.name}
                  style={{
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderBottom: "1px solid #9d4edd",
                  }}
                />
              )}
              <Card.Body>
                <Card.Title style={{ color: "#c77dff" }}>{game.name}</Card.Title>
                <Button
                  style={{
                    backgroundColor: "#9d4edd",
                    borderColor: "#9d4edd",
                    color: "#fff",
                    marginRight: "8px",
                  }}
                  onClick={() => handleShowModal("edit", game)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#c77dff")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#9d4edd")}
                >
                  Editar
                </Button>
                <Button
                  style={{
                    backgroundColor: "#ff4dff",
                    borderColor: "#ff4dff",
                    color: "#fff",
                  }}
                  onClick={() => handleExcluir(game)}
                >
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal para adicionar/editar */}
      <Modal show={showModal && modalMode !== "delete"} onHide={handleCloseModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}
        >
          <Modal.Title>
            {modalMode === "add" ? "Adicionar Jogo" : "Editar Jogo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}>
          <Form>
            <Form.Group controlId="gameName">
              <Form.Label style={{ color: "#bfa8d6" }}>Nome do jogo</Form.Label>
              <Form.Control
                type="text"
                value={gameForm.name}
                onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="gameImage" className="mt-3">
              <Form.Label style={{ color: "#bfa8d6" }}>Imagem (URL)</Form.Label>
              <Form.Control
                type="text"
                value={gameForm.image}
                onChange={(e) => setGameForm({ ...gameForm, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2c1a47" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            style={{
              backgroundColor: "#9d4edd",
              borderColor: "#9d4edd",
              color: "#fff",
            }}
            onClick={handleSubmit}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c77dff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#9d4edd")}
          >
            {modalMode === "add" ? "Adicionar" : "Salvar Alterações"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showModal && modalMode === "delete"} onHide={handleCloseModal}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}
        >
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}>
          Tem certeza que deseja excluir o jogo{" "}
          <strong style={{ color: "#ff4dff" }}>{selectedGame?.name}</strong>?
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#2c1a47" }}>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            style={{
              backgroundColor: "#ff4dff",
              borderColor: "#ff4dff",
              color: "#fff",
            }}
            onClick={confirmDelete}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Jogos;
