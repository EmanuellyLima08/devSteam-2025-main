import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Promotion from "./components/Promotion";
import CarrinhoOffCanvas from "./components/CarrinhoOffCanvas";
import OutrosJogos from "./components/OutrosJogos";
import Footer from "./components/footer";

function App() {
  const [carrinhoItem, setCarrinhoItem] = useState([]);

  useEffect(() => {
    localStorage.setItem("devcarrinho", JSON.stringify(carrinhoItem));
  }, [carrinhoItem]);

  useEffect(() => {
    const salvaCarrinho = localStorage.getItem("devcarrinho");
    salvaCarrinho && setCarrinhoItem(JSON.parse(salvaCarrinho));
  }, []);

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

  return (
    <div className="App">
      <Header />
      <Promotion onAddCarrinho={handleAddCarrinho} />
      <CarrinhoOffCanvas carrinhoItem={carrinhoItem} />
      <OutrosJogos onAddCarrinho={handleAddCarrinho} />
      <Footer />
    </div>
  );
}

export default App;