import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { GlobalContext } from "../main.jsx";

const CarrinhoOffCanvas = (props) => {
  const navigate = useNavigate();
  const { formatarMoeda } = useContext(GlobalContext);

  const total = props.carrinhoItem.reduce(
    (acc, item) =>
      acc + (item.preco - (item.preco * item.desconto) / 100) * item.quantidade,
    0
  );

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div
      id="carrinhoOffCanvas"
      className="offcanvas offcanvas-end"
      style={{ background: "#301658" }}
    >
      <div
        className="offcanvas-header text-light"
        style={{ background: "#160E21" }}
      >
        <h5 className="offcanvas-title">
          <i className="bi bi-cart4 me-2 fs-4"></i>Carrinho
        </h5>
        <i
          role="button"
          className="ms-auto fs-2 p-0 m-0 bi bi-x"
          data-bs-dismiss="offcanvas"
        ></i>
      </div>

      <div className="offcanvas-body">
        {props.carrinhoItem.length === 0 ? (
          <p className="text-center text-light">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="list-group list-group-flush">
              {props.carrinhoItem.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-3 shadow mt-3 d-flex gap-3"
                  style={{ background: "#d9d9d9", borderRadius: "5px" }}
                >
                  <img
                    className="object-fit-cover rounded-2"
                    src={item.imagem}
                    alt={item.titulo}
                    width={60}
                    height={80}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold p-1">{item.titulo}</h6>
                      <i
                        role="button"
                        className="bi bi-trash fs-5 text-danger"
                        onClick={() => props.onRemoveCarrinho(item)}
                      ></i>
                    </div>

                    <div className="d-flex justify-content-between">
                      {/* Botões restaurados conforme versão anterior */}
                      <div className="border border-dark-subtle border-1 d-flex align-items-center rounded-4 gap-2">
                        <button
                          className="btn border-0"
                          disabled={item.quantidade === 1}
                          onClick={() =>
                            props.onUpdateCarrinho(item, item.quantidade - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                          className="btn border-0"
                          onClick={() =>
                            props.onUpdateCarrinho(item, item.quantidade + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="d-flex flex-column align-items-end">
                        <span className="text-decoration-line-through small">
                          {formatarMoeda(item.preco)}
                        </span>
                        <span className="fw-bolder fs-5">
                          {formatarMoeda(
                            item.preco - (item.preco * item.desconto) / 100
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <hr className="text-white" />
            <div className="d-flex justify-content-between text-light fs-4">
              <strong>Total:</strong>
              <strong>{formatarMoeda(total)}</strong>
            </div>
            {/* Botão atualizado com a mesma estilização do "Adicionar ao carrinho" */}
            <button
              id="addCarrinho"
              className="btn w-100 mt-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#carrinhoOffCanvas"
              onClick={goToCheckout}
              style={{
                backgroundColor: "#C77DFF", // Cor do botão
                color: "#fff",
                border: "none",
                padding: "12px 0",
                fontSize: "1rem",
              }}
            >
              <i className="bi bi-bag-check me-2"></i>
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarrinhoOffCanvas;
