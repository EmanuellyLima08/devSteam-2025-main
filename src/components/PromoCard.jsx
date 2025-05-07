import React, { useState } from "react";

const PromoCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {/* CARD COM ESTILO IGUAL À IMAGEM */}
      <div
        id="PromoCard"
        className="promoCard card border-0 overflow-hidden"
        onClick={toggleModal}
        style={{
          cursor: "pointer",
          width: "100%",
          maxWidth: "320px",
          backgroundColor: "#824FD1", // Fundo do card
          padding: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <img
          className="card-img-top object-fit-cover"
          src={props.imagem}
          height={300}
          alt={props.titulo}
        />
        <div className="card-body d-flex flex-column gap-3 text-light">
          <h5 className="card-title text-uppercase text-truncate fw-bold">
            {props.titulo}
          </h5>
          <div className="d-flex align-items-center gap-0">
            {/* Tag de desconto com bordas retas */}
            <span
              className="fw-bold p-2 text-center"
              style={{
                backgroundColor: "#000", // Fundo preto
                color: "#FF4DFF", // Número rosa vibrante
                fontSize: "1.2rem",
                minWidth: "90px",
                height: "40px", // Ajuste na altura para alinhar
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              -{props.desconto}%
            </span>
            {/* Preço dentro do fundo roxo escuro com bordas retas */}
            <div
              className="text-end"
              style={{
                backgroundColor: "#6A3BB2", // Fundo roxo escuro
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end", // Alinhado à direita
                justifyContent: "center",
                minWidth: "179px", // Comprimento maior
                height: "40px", // Altura reduzida para alinhamento perfeito
                padding: "5px 15px",
              }}
            >
              <p
                className="text-decoration-line-through small m-0"
                style={{ color: "#ccc", fontSize: "0.8rem" }} // Fonte menor
              >
                {formatarMoeda(props.preco)}
              </p>
              <p className="fw-bold fs-6 m-0" style={{ color: "#fff" }}>
                {formatarMoeda(precoComDesconto)}
              </p>
            </div>
          </div>
          <button
            id="addCarrinho"
            className="btn w-100 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              props.onAddCarrinho();
            }}
            style={{
              backgroundColor: "#C77DFF", // Cor do botão
              color: "#fff",
              border: "none",
              padding: "12px 0",
              fontSize: "1rem",
            }}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </>
  );
};

export default PromoCard;
