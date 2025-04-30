import React from "react";

const GameCard = ({ titulo, preco, desconto, imagem, descricao, categoria }) => {
  const precoFinal = (preco * (1 - desconto / 100)).toFixed(2).replace(".", ",");

  return (
    <div
      className="d-flex flex-column flex-sm-row rounded overflow-hidden"
      style={{ backgroundColor: "#2b87ae", color: "white", height: "150px" }}
    >
      <div className="col-12 col-sm-4">
        <img
          src={imagem}
          alt={titulo}
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="col-12 col-sm-8 d-flex flex-column justify-content-between flex-grow-1 p-4">
        <div>
          <h5 className="fw-bold text-uppercase">{titulo}</h5>
          <p className="text-white-50 m-0">{categoria}</p>
        </div>

        <div className="d-flex justify-content-between align-items-end mt-3">
          <h3 className="mb-0 fw-bold">R${precoFinal}</h3>
          <button className="btn px-4 py-2 fw-bold text-white" style={{ backgroundColor: "#547625", borderRadius: "12px" }}>
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
