import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Promotion from "./components/Promotion";
import CarrinhoOffCanvas from "./components/CarrinhoOffCanvas";
import OutrosJogos from "./components/OutrosJogos";
import Footer from "./components/Footer";

function App() {
  const [carrinhoItem, setCarrinhoItem] = useState([]);

  // Salvar carrinho no LocalStorage sempre que houver alteração
  useEffect(() => {
    localStorage.setItem("devcarrinho", JSON.stringify(carrinhoItem));
  }, [carrinhoItem]);

  // Recuperar carrinho salvo no LocalStorage ao carregar a página
  useEffect(() => {
    const salvaCarrinho = localStorage.getItem("devcarrinho");
    if (salvaCarrinho) {
      setCarrinhoItem(JSON.parse(salvaCarrinho));
    }
  }, []);

  // Função para adicionar um item ao carrinho
  const handleAddCarrinho = (produto) => {
    setCarrinhoItem((itemAnterior) => {
      const existe = itemAnterior.find((item) => item.id === produto.id);
      if (existe) {
        return itemAnterior.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...itemAnterior, { ...produto, quantidade: 1 }];
    });
  };

  // Função para atualizar a quantidade de um item no carrinho
  const handleUpdateCarrinho = (produto, novaQuantidade) => {
    setCarrinhoItem((itemAnterior) =>
      itemAnterior.map((item) =>
        item.id === produto.id ? { ...item, quantidade: novaQuantidade } : item
      )
    );
  };

  // Função para remover um item do carrinho
  const handleRemoveCarrinho = (produto) => {
    setCarrinhoItem((itemAnterior) =>
      itemAnterior.filter((item) => item.id !== produto.id)
    );
  };

  return (
    <div className="App">
      <Header contadorJogos={carrinhoItem.length} />
      <Promotion onAddCarrinho={handleAddCarrinho} />
      {/* Agora passando as funções corretas para o CarrinhoOffCanvas */}
      <CarrinhoOffCanvas
        carrinhoItem={carrinhoItem}
        onUpdateCarrinho={handleUpdateCarrinho}
        onRemoveCarrinho={handleRemoveCarrinho}
      />
      <OutrosJogos onAddCarrinho={handleAddCarrinho} />
      <Footer />
    </div>
  );
}

export default App;
