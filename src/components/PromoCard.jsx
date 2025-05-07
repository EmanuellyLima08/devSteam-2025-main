import React, { useState } from "react";

const PromoCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const precoComDesconto = props.preco - (props.preco * props.desconto) / 100;

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {/* CARD PRINCIPAL */}
      <div
        id="PromoCard"
        className="promoCard card border-0 overflow-hidden"
        onClick={toggleModal}
        style={{
          cursor: "pointer",
          width: "100%",
          maxWidth: "320px",
          backgroundColor: "#3c2a58",
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
        <div className="card-body d-flex flex-column gap-3" style={{ color: "#f1f1f1" }}>
          <h5 className="card-title text-uppercase text-truncate fw-bold">
            {props.titulo}
          </h5>
          <div className="d-flex align-items-center gap-0">
            <span
              className="fw-bold p-2 text-center"
              style={{
                backgroundColor: "#000",
                color: "#ff4dff",
                fontSize: "1.2rem",
                minWidth: "90px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              -{props.desconto}%
            </span>
            <div
              className="text-end"
              style={{
                backgroundColor: "#6A3BB2",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                minWidth: "179px",
                height: "40px",
                padding: "5px 15px",
              }}
            >
              <p
                className="text-decoration-line-through small m-0"
                style={{ color: "#bfa8d6", fontSize: "0.8rem" }}
              >
                {formatarMoeda(props.preco)}
              </p>
              <p className="fw-bold fs-6 m-0" style={{ color: "#f1f1f1" }}>
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
              backgroundColor: "#C77DFF",
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

      {/* MODAL PERSONALIZADO */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          tabIndex="-1"
          role="dialog"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="modal-content"
              style={{ backgroundColor: "#2c1a47", color: "#f1f1f1" }}
            >
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold" style={{ color: "#9d4edd" }}>
                  {props.titulo}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  style={{ filter: "invert(1)" }}
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body row g-4">
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
                  <p style={{ color: "#bfa8d6" }}>
                    <strong style={{ color: "#f1f1f1" }}>Gênero:</strong> {props.categoria}
                  </p>
                  <p style={{ color: "#bfa8d6" }}>
                    <strong style={{ color: "#f1f1f1" }}>Descrição:</strong> {props.descricao}
                  </p>
                  <p style={{ color: "#bfa8d6" }}>
                    <strong style={{ color: "#f1f1f1" }}>Preço original:</strong>{" "}
                    {formatarMoeda(props.preco)}
                  </p>
                  <p style={{ color: "#bfa8d6" }}>
                    <strong style={{ color: "#f1f1f1" }}>Desconto:</strong> {props.desconto}%
                  </p>
                  <p>
                    <strong style={{ color: "#f1f1f1" }}>Preço final:</strong>{" "}
                    <span className="fw-bold" style={{ color: "#ff4dff" }}>
                      {formatarMoeda(precoComDesconto)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#9d4edd",
                    color: "#f1f1f1",
                    border: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#c77dff")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#9d4edd")}
                  onClick={() => {
                    props.onAddCarrinho();
                    setShowModal(false);
                  }}
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#3c2a58",
                    color: "#f1f1f1",
                    border: "none",
                  }}
                  onClick={() => setShowModal(false)}
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
