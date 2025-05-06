import React, { useState } from "react";

const PromoCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {/* CARD NORMAL (3 CARDS POR LINHA, ESTILO ANTERIOR) */}
      <div
        id="PromoCard"
        className="promoCard card border-0 overflow-hidden"
        onClick={toggleModal}
        style={{ cursor: "pointer", width: "100%", maxWidth: "320px" }}
      >
        <img
          className="card-img-top object-fit-cover"
          src={props.imagem}
          height={300}
          alt={props.titulo}
        />
        <div className="card-body d-flex flex-column gap-2">
          <h5
            className="card-title text-uppercase text-truncate fw-bold text-light"
          >
            {props.titulo}
          </h5>
          <div className="d-flex justify-content-between align-items-center">
            {/* Modificação para o quadrado em volta da porcentagem e a cor verde */}
            <span
              className="desconto text-light fw-bold p-1 rounded"
              style={{
                backgroundColor: "black",
                color: "green",
                fontSize: "1.2rem",
              }}
            >
              -{props.desconto}%
            </span>
            <div className="text-end">
              <p className="text-secondary text-decoration-line-through small m-0">
                {formatarMoeda(props.preco)}
              </p>
              <p className="corValor text-success fw-bold fs-5 m-0">
                {formatarMoeda(precoComDesconto)}
              </p>
            </div>
          </div>
          <button
            id="addCarrinho"
            className="btn btn-success desconto text-light w-100 border-0"
            onClick={(e) => {
              e.stopPropagation();
              props.onAddCarrinho();
            }}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      {/* MODAL AO CLICAR */}
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
                <div className="row g-4">
                  <div className="col-md-4 text-center">
                    <img
                      src={props.imagem}
                      alt={props.titulo}
                      className="img-fluid rounded"
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <p><strong>Categoria:</strong> {props.categoria || "Ação / Mundo Aberto"}</p>
                    {/* Descrição personalizada */}
                    <p><strong>Descrição:</strong> {props.descricao || "Mergulhe em uma aventura épica com gráficos impressionantes e jogabilidade envolvente. Cada missão traz novas emoções, com um mundo aberto para explorar ao seu ritmo."}</p>
                    <p><strong>Preço original:</strong> {formatarMoeda(props.preco)}</p>
                    <p><strong>Desconto:</strong> {props.desconto}%</p>
                    <p><strong>Preço com desconto:</strong> {formatarMoeda(precoComDesconto)}</p>
                  </div>
                </div>
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
                <button className="btn btn-secondary" onClick={toggleModal}>
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
