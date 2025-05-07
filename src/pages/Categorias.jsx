import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaRunning, FaDragon, FaPuzzlePiece, FaShieldAlt,
  FaCar, FaFutbol, FaCogs, FaSkullCrossbones
} from "react-icons/fa";

const Categorias = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Aventura", icon: <FaRunning /> },
    { id: 2, name: "Terror", icon: <FaSkullCrossbones /> },
    { id: 3, name: "RPG", icon: <FaDragon /> },
    { id: 4, name: "Estratégia", icon: <FaShieldAlt /> },
    { id: 5, name: "Corrida", icon: <FaCar /> },
    { id: 6, name: "Esportes", icon: <FaFutbol /> },
    { id: 7, name: "Simulação", icon: <FaCogs /> },
    { id: 8, name: "Puzzle", icon: <FaPuzzlePiece /> },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [modalAction, setModalAction] = useState("");

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: newCategoryName,
        icon: <FaPuzzlePiece />,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setShowModal(false);
    }
  };

  const handleEditCategory = () => {
    if (selectedCategory && newCategoryName.trim()) {
      const updatedCategories = categories.map((category) =>
        category.id === selectedCategory.id
          ? { ...category, name: newCategoryName }
          : category
      );
      setCategories(updatedCategories);
      setShowModal(false);
      setSelectedCategory(null);
      setNewCategoryName("");
    }
  };

  const handleRemoveCategory = () => {
    const updatedCategories = categories.filter(
      (category) => category.id !== selectedCategory.id
    );
    setCategories(updatedCategories);
    setShowModal(false);
    setSelectedCategory(null);
    setNewCategoryName("");
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setNewCategoryName(category.name);
    setModalAction("edit");
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    setNewCategoryName("");
    setModalAction("create");
    setShowModal(true);
  };

  const openRemoveModal = (category) => {
    setSelectedCategory(category);
    setModalAction("remove");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setNewCategoryName("");
    setModalAction("");
  };

  return (
    <div className="container py-5" style={{ backgroundColor: "#1a1125", minHeight: "100vh" }}>
      <h1 className="mb-4 text-center" style={{ color: "#9d4edd" }}>Gerenciar Categorias</h1>

      {/* Botão Nova Categoria */}
      <div className="mb-4 text-center">
        <button
          className="btn"
          onClick={openCreateModal}
          style={{
            backgroundColor: "#9d4edd",
            color: "#f1f1f1",
            border: "none",
            transition: "0.3s",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#c77dff"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#9d4edd"}
        >
          + Nova Categoria
        </button>
      </div>

      {/* Lista de Categorias */}
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-3 mb-4">
            <div
              className="card text-center"
              style={{
                backgroundColor: "#3c2a58",
                border: "1px solid #9d4edd",
                color: "#f1f1f1",
                borderRadius: "10px"
              }}
            >
              <div className="card-body">
                <div style={{ fontSize: "1.8rem", color: "#c77dff" }}>
                  {category.icon}
                </div>
                <h5 className="card-title mt-2">{category.name}</h5>
                <button
                  className="btn btn-sm me-2 mt-2"
                  style={{ backgroundColor: "#9d4edd", color: "#fff", border: "none" }}
                  onClick={() => openEditModal(category)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm mt-2"
                  style={{ backgroundColor: "#ff4dff", color: "#fff", border: "none" }}
                  onClick={() => openRemoveModal(category)}
                >
                  Apagar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
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
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content" style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}>
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">
                  {modalAction === "edit" && "Editar Categoria"}
                  {modalAction === "create" && "Criar Nova Categoria"}
                  {modalAction === "remove" && "Excluir Categoria"}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {(modalAction === "edit" || modalAction === "create") && (
                  <input
                    type="text"
                    className="form-control"
                    style={{ backgroundColor: "#1a1125", color: "#f1f1f1", border: "1px solid #9d4edd" }}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                  />
                )}
                {modalAction === "remove" && (
                  <p style={{ color: "#ff4dff" }}>Tem certeza que deseja apagar essa categoria?</p>
                )}
              </div>
              <div className="modal-footer border-0">
                {modalAction === "edit" && (
                  <>
                    <button className="btn" style={{ backgroundColor: "#9d4edd", color: "#fff" }} onClick={handleEditCategory}>
                      Salvar
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Cancelar
                    </button>
                  </>
                )}
                {modalAction === "create" && (
                  <button className="btn" style={{ backgroundColor: "#9d4edd", color: "#fff" }} onClick={handleAddCategory}>
                    Criar
                  </button>
                )}
                {modalAction === "remove" && (
                  <>
                    <button className="btn" style={{ backgroundColor: "#ff4dff", color: "#fff" }} onClick={handleRemoveCategory}>
                      Excluir
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;
