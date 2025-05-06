import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Categorias = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Aventura", image: "https://via.placeholder.com/300x200?text=Aventura" },
    { id: 2, name: "Terror", image: "https://via.placeholder.com/300x200?text=Terror" },
    { id: 3, name: "RPG", image: "https://via.placeholder.com/300x200?text=RPG" },
    { id: 4, name: "Estratégia", image: "https://via.placeholder.com/300x200?text=Estratégia" },
    { id: 5, name: "Corrida", image: "https://via.placeholder.com/300x200?text=Corrida" },
    { id: 6, name: "Esportes", image: "https://via.placeholder.com/300x200?text=Esportes" },
    { id: 7, name: "Simulação", image: "https://via.placeholder.com/300x200?text=Simulação" },
    { id: 8, name: "Puzzle", image: "https://via.placeholder.com/300x200?text=Puzzle" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newId = categories.length + 1;
      setCategories([...categories, {
        id: newId,
        name: newCategory,
        image: "https://via.placeholder.com/300x200?text=Nova+Categoria"
      }]);
      setNewCategory("");
      setIsCreating(false);
      setShowModal(false);
    }
  };

  const handleEditCategory = (updatedName) => {
    if (selectedCategory) {
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id
          ? { ...category, name: updatedName }
          : category
      );
      setCategories(updatedCategories);
      setSelectedCategory(null);
      setShowModal(false);
    }
  };

  const handleRemoveCategory = () => {
    if (selectedCategory) {
      const updatedCategories = categories.filter(
        (category) => category.id !== selectedCategory.id
      );
      setCategories(updatedCategories);
      setSelectedCategory(null);
      setShowModal(false);
    }
  };

  const openCreateModal = () => {
    setIsCreating(true);
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setIsCreating(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setIsCreating(false);
    setSelectedCategory(null);
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="my-4">Gerenciar Categorias</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card h-100 d-flex justify-content-center align-items-center"
            style={{ cursor: "pointer", height: "200px" }}
            onClick={openCreateModal}
          >
            <div className="card-body text-center">
              <h5 className="card-title">+ Nova Categoria</h5>
            </div>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="col-md-4 mb-4">
            <div
              className="card h-100"
              style={{ cursor: "pointer", height: "200px" }}
              onClick={() => openEditModal(category)}
            >
              <img
                src={category.image}
                className="card-img-top"
                alt={category.name}
                style={{ height: "120px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{category.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1040,
            }}
          ></div>

          <div
            className="modal fade show"
            tabIndex="-1"
            style={{
              display: "block",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              width: "400px",
              height: "400px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {/* Título */}
            <div className="modal-header">
              <h5 className="modal-title">
                {isCreating ? "Criar Nova Categoria" : "Editar Categoria"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
              ></button>
            </div>

            {/* Input */}
            <div className="modal-body d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder={isCreating ? "Nome da Categoria" : "Novo Nome da Categoria"}
                value={isCreating ? newCategory : selectedCategory?.name || ""}
                onChange={(e) =>
                  isCreating
                    ? setNewCategory(e.target.value)
                    : setSelectedCategory({ ...selectedCategory, name: e.target.value })
                }
              />
            </div>

            {/* Botões */}
            <div className="modal-footer d-flex justify-content-between">
              {isCreating ? (
                <>
                  <button onClick={handleAddCategory} className="btn btn-primary">
                    Criar Categoria
                  </button>
                  <button onClick={closeModal} className="btn btn-secondary">
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditCategory(selectedCategory.name)}
                    className="btn btn-primary"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    onClick={handleRemoveCategory}
                    className="btn btn-danger"
                  >
                    Excluir Categoria
                  </button>
                  <button onClick={closeModal} className="btn btn-secondary">
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Categorias;
