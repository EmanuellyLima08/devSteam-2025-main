import React, { useState } from "react";

const PromoCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div
        className="card text-light border-0"
        onClick={toggleModal}
        style={{
          backgroundColor: "#000",
          maxWidth: "300px",
          borderRadius: "16px",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Imagem */}
        <img
          src={props.imagem}
          alt={props.titulo}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
        />

        {/* Parte inferior azul */}
        <div
          className="p-3 d-flex flex-column align-items-center text-center"
          style={{ backgroundColor: "#2A89AD" }} // fundo azul
        >
          <h4
            className="fw-bold text-uppercase"
            style={{ fontSize: "1.4rem", color: "white", marginBottom: "10px" }}
          >
            {props.titulo}
          </h4>

          <p className="text-uppercase text-white fw-bold mb-2">
            OFERTA EXCLUSIVA
          </p>

          {/* Preços e desconto */}
          <div className="d-flex justify-content-between w-100 align-items-center mb-3">
            <span
              style={{
                backgroundColor: "black",
                color: "#4C7212", // ✅ cor VERDE aplicada aqui
                padding: "6px 14px",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderRadius: "4px",
              }}
            >
              -{props.desconto}%
            </span>

            <div className="text-end">
              <p
                style={{
                  color: "#ddd",
                  textDecoration: "line-through",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                {formatarMoeda(props.preco)}
              </p>
              <p
                style={{
                  color: "#4C7212", // verde escuro aplicado
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                {formatarMoeda(precoComDesconto)}
              </p>
            </div>
          </div>

          {/* Botão */}
          <button
            className="w-100"
            onClick={(e) => {
              e.stopPropagation();
              props.onAddCarrinho();
            }}
            style={{
              backgroundColor: "#4C7212", // verde escuro aplicado
              color: "white",
              border: "none",
              padding: "12px 0",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      {/* Modal */}
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
                      style={{
                        maxHeight: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>
                      <strong>Categoria:</strong>{" "}
                      {props.categoria || "Ação / Mundo Aberto"}
                    </p>
                    <p>
                      <strong>Descrição:</strong>{" "}
                      {props.descricao ||
                        "Mergulhe em uma aventura épica com gráficos impressionantes e jogabilidade envolvente. Cada missão traz novas emoções, com um mundo aberto para explorar ao seu ritmo."}
                    </p>
                    <p>
                      <strong>Preço original:</strong>{" "}
                      {formatarMoeda(props.preco)}
                    </p>
                    <p>
                      <strong>Desconto:</strong> {props.desconto}%
                    </p>
                    <p>
                      <strong>Preço com desconto:</strong>{" "}
                      <span style={{ color: "#4C7212" }}>
                        {formatarMoeda(precoComDesconto)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#4C7212",
                    color: "white",
                    fontWeight: "bold",
                  }}
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
