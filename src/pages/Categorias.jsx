import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const categoriaImagens = {
  "Aventura": "https://via.placeholder.com/300x200?text=Aventura",
  "Terror": "https://via.placeholder.com/300x200?text=Terror",
  "RPG": "https://via.placeholder.com/300x200?text=RPG",
  "Estratégia": "https://via.placeholder.com/300x200?text=Estratégia",
  "Corrida": "https://via.placeholder.com/300x200?text=Corrida",
  "Esportes": "https://via.placeholder.com/300x200?text=Esportes",
  "Simulação": "https://via.placeholder.com/300x200?text=Simulação",
  "Puzzle": "https://via.placeholder.com/300x200?text=Puzzle",
};

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ id: null, name: "", image: "" });

  useEffect(() => {
    const categoriasSalvas = localStorage.getItem("devcategories");
    if (categoriasSalvas) {
      setCategories(JSON.parse(categoriasSalvas));
    }
  }, []);

  const salvarNoStorage = (dados) => {
    localStorage.setItem("devcategories", JSON.stringify(dados));
  };

  const handleShowModal = (mode, category = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
    setCategoryForm(
      category || {
        id: Date.now(),
        name: "",
        image: categoriaImagens["Aventura"] 
      }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      categoryForm.image = categoriaImagens[categoryForm.name] || "https://via.placeholder.com/300x200?text=Nova+Categoria";
      const atualizadas = [...categories, categoryForm];
      setCategories(atualizadas);
      salvarNoStorage(atualizadas);
    } else if (modalMode === "edit") {
      categoryForm.image = categoriaImagens[categoryForm.name] || selectedCategory.image;
      const atualizadas = categories.map((c) =>
        c.id === selectedCategory.id ? categoryForm : c
      );
      setCategories(atualizadas);
      salvarNoStorage(atualizadas);
    }
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h2>Gerenciar Categorias</h2>

      <Card className="mb-4" onClick={() => handleShowModal("add")} style={{ cursor: "pointer" }}>
        <Card.Body className="text-center">
          <h5>+ Nova Categoria</h5>
        </Card.Body>
      </Card>

      <div className="row">
        {categories.map((category) => (
          <div className="col-md-4 mb-4" key={category.id}>
            <Card>
              <Card.Img
                variant="top"
                src={category.image}
                alt={category.name}
                style={{ maxHeight: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleShowModal("edit", category)}
                >
                  Editar
                </Button>
                <Button variant="danger" onClick={() => setShowModal(true)}>
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Adicionar Categoria" : "Editar Categoria"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName">
              <Form.Label>Nome da categoria</Form.Label>
              <Form.Control
                type="text"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
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
    </div>
  );
};

export default Categorias;
