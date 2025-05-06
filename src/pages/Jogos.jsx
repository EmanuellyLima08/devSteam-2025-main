import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const Jogos = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit"
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
        image: ""
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
    <div className="container mt-4">
      <h2>Gerenciar Jogos</h2>
      
      {/* Botão de novo jogo */}
      <Card className="mb-4" onClick={() => handleShowModal("add")} style={{ cursor: "pointer" }}>
        <Card.Body className="text-center">
          <h5>+ Novo Jogo</h5>
        </Card.Body>
      </Card>

      <div className="row">
        {/* Lista de jogos */}
        {games.map((game) => (
          <div className="col-md-4 mb-4" key={game.id}>
            <Card>
              {game.image && (
                <Card.Img
                  variant="top"
                  src={game.image}
                  alt={game.name}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleShowModal("edit", game)}
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleExcluir(game)}>
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal para adicionar/editar */}
      <Modal show={showModal && modalMode !== "delete"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "add" ? "Adicionar Jogo" : "Editar Jogo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="gameName">
              <Form.Label>Nome do jogo</Form.Label>
              <Form.Control
                type="text"
                value={gameForm.name}
                onChange={(e) => setGameForm({ ...gameForm, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="gameImage" className="mt-3">
              <Form.Label>Imagem (URL)</Form.Label>
              <Form.Control
                type="text"
                value={gameForm.image}
                onChange={(e) => setGameForm({ ...gameForm, image: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalMode === "add" ? "Adicionar" : "Salvar Alterações"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showModal && modalMode === "delete"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o jogo <strong>{selectedGame?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Jogos;
