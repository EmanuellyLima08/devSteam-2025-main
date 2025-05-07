import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRunning, FaDragon, FaPuzzlePiece, FaShieldAlt, FaCar, FaFutbol, FaCogs, FaSkullCrossbones } from "react-icons/fa";


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
  const [modalAction, setModalAction] = useState(""); // Controlar se é editar ou criar ou excluir

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
    setModalAction("edit"); // Define que a ação é de editar
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedCategory(null);
    setNewCategoryName("");
    setModalAction("create"); // Define que a ação é de criar
    setShowModal(true);
  };

  const openRemoveModal = (category) => {
    setSelectedCategory(category);
    setModalAction("remove"); // Define que a ação é de excluir
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setNewCategoryName("");
    setModalAction(""); // Resetar a ação do modal
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gerenciar Categorias</h1>

      {/* Botão Nova Categoria */}
      <div
        className="mb-4"
        onClick={openCreateModal} // Abre o modal para criar nova categoria
        style={{ cursor: "pointer" }}
      >
        <div className="card text-center">
          <div className="card-body">
            <h5>+ Nova Categoria</h5>
          </div>
        </div>
      </div>

      {/* Lista de Categorias */}
      <div className="row">
        {categories.map((category) => (
          <div key={category.id} className="col-md-3 mb-4">
            <div className="card p-2 d-flex align-items-center" style={{ width: "auto" }}>
              <div className="d-flex align-items-center">
                {/* Ícone da Categoria */}
                <div className="me-2" style={{ fontSize: "1.5rem" }}>
                  {category.icon}
                </div>
                <div>
                  <h5 className="card-title m-0">{category.name}</h5>
                </div>
              </div>
              <div className="mt-2">
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => openEditModal(category)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
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
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalAction === "edit" && "Editar Categoria"}
                  {modalAction === "create" && "Criar Nova Categoria"}
                  {modalAction === "remove" && "Excluir Categoria"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                {modalAction === "edit" && (
                  <input
                    type="text"
                    className="form-control"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                  />
                )}
                {modalAction === "create" && (
                  <input
                    type="text"
                    className="form-control"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nome da Categoria"
                  />
                )}
                {modalAction === "remove" && (
                  <p>Tem certeza que deseja apagar essa categoria?</p>
                )}
              </div>
              <div className="modal-footer">
                {modalAction === "edit" && (
                  <>
                    <button
                      className="btn btn-primary"
                      onClick={handleEditCategory}
                    >
                      Salvar Alterações
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </>
                )}
                {modalAction === "create" && (
                  <button
                    className="btn btn-primary"
                    onClick={handleAddCategory}
                  >
                    Criar Categoria
                  </button>
                )}
                {modalAction === "remove" && (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={handleRemoveCategory}
                    >
                      Excluir
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={closeModal}
                    >
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
