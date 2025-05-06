import React, { useState } from "react";

const Jogos = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({ name: "", image: null });

  const handleAddGame = () => {
    if (newGame.name.trim()) {
      setGames([...games, newGame]);
      setNewGame({ name: "", image: null });
    }
  };

  const handleEditGame = (index) => {
    const updatedName = prompt("Editar nome do jogo:", games[index].name);
    if (updatedName) {
      const updatedGames = [...games];
      updatedGames[index].name = updatedName;
      setGames(updatedGames);
    }
  };

  const handleImageUpload = (e) => {
    setNewGame({ ...newGame, image: e.target.files[0] });
  };

  return (
    <div>
      <h1>Gerenciar Jogos</h1>
      <input
        type="text"
        placeholder="Nome do Jogo"
        value={newGame.name}
        onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
      />
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleAddGame}>Adicionar</button>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            {game.name}{" "}
            <button onClick={() => handleEditGame(index)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jogos;