import React, { useState } from "react";

const Categorias = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div>
      <h1>Gerenciar Categorias</h1>
      <input
        type="text"
        placeholder="Nova Categoria"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Adicionar</button>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {category} <button onClick={() => handleRemoveCategory(category)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categorias;