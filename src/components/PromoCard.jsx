import React, { useState } from "react";

const PromoCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;
  const toggleModal = () => setShowModal(!showModal);

  // Dados fictícios caso não sejam passados como props
  const genero = props.genero || "Ação / Mundo Aberto";
  const classificacao = props.classificacao || "16+";
  const descricao =
    props.descricao ||
    "Explore um vasto mundo pós-apocalíptico repleto de inimigos, aliados e decisões que afetam sua jornada.";
  const requisitos = props.requisitos || [
    "Sistema: Windows 10 64-bit",
    "Processador: Intel Core i5-6600K",
    "Memória: 8 GB de RAM",
    "Placa de vídeo: GTX 1050 Ti",
    "Armazenamento: 60 GB de espaço disponível",
  ];

  return (
    <>
      <div
        id="PromoCard"
        className="promoCard card border-0 overflow-hidden"
        onClick={toggleModal}
        style={{ cursor: "pointer" }}
      >
        <img
          className="card-img-top object-fit-cover"
          src={props.imagem}
          height={300}
          alt={props.titulo}
        />
        <div className="card-body d-flex flex-column gap-2">
          <h5
            data-bs-toggle="tooltip"
            title={props.titulo}
            className="card-title text-uppercase text-truncate mw-100 h-100 fw-bold text-light text-nowrap"
          >
            {props.titulo}
          </h5>
          <div className="m-0 row h-100 align-items-center justify-content-center">
            <span className="desconto col-4 fw-bold h5 m-0 d-flex align-items-center">
              -{props.desconto}%
            </span>
            <div className="col bg-dark">
              <p className="m-0 p-0 text-end text-secondary text-decoration-line-through small">
                <small>{props.precoFormatado}</small>
              </p>
              <p className="corValor m-0 p-0 fs-4 text-end fw-bolder">
                {props.formatarMoeda(precoComDesconto)}
              </p>
            </div>
          </div>
          <button
            id="addCarrinho"
            className="btn btn-success desconto text-light w-100 border-0"
            onClick={(e) => {
              e.stopPropagation(); // Evita abrir modal ao clicar no botão
              props.onAddCarrinho();
            }}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      {/* Modal de detalhes */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          tabIndex="-1"
          role="dialog"
          onClick={toggleModal}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title">{props.titulo}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={toggleModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                  src={props.imagem}
                  alt={props.titulo}
                  className="img-fluid mb-3 rounded"
                />
                <p><strong>Gênero:</strong> {genero}</p>
                <p><strong>Classificação:</strong> {classificacao}</p>
                <p><strong>Descrição:</strong> {descricao}</p>
                <p><strong>Requisitos mínimos:</strong></p>
                <ul>
                  {requisitos.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    props.onAddCarrinho();
                    toggleModal();
                  }}
                >
                  <i className="bi bi-cart-plus me-2"></i> Adicionar ao carrinho
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromoCard;
