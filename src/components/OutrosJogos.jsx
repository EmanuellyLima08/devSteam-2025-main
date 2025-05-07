import React, { useMemo, useState } from "react";

const OutrosJogos = ({ onAddCarrinho }) => {
  const [jogoSelecionado, setJogoSelecionado] = useState(null);

  const games = useMemo(
    () => [
      {
        id: 1,
        titulo: "Counter-Strike: Global Offensive",
        preco: 99.9,
        desconto: 0,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
        descricao:
          "O clássico FPS competitivo retorna com gráficos renovados e jogabilidade ainda mais precisa.",
        categoria: "Ação, Estratégia, Multijogador.",
      },
      {
        id: 2,
        titulo: "Cyberpunk 2077",
        preco: 129.99,
        desconto: 20,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        descricao:
          "Explore Night City como um mercenário em um futuro distópico, com narrativa profunda e visuais impressionantes.",
        categoria: "RPG de Ação",
      },
      {
        id: 3,
        titulo: "Elden Ring",
        preco: 249.9,
        desconto: 35,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        descricao:
          "Uma aventura épica em mundo aberto criada por Hidetaka Miyazaki e George R. R. Martin. Desafios intensos e lore profundo.",
        categoria: "RPG",
      },
      {
        id: 4,
        titulo: "Red Dead Redemption 2",
        preco: 199.9,
        desconto: 40,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
        descricao:
          "Viva o Velho Oeste como Arthur Morgan em uma jornada cinematográfica com detalhes incríveis e mundo vivo.",
        categoria: "Ação e Aventura",
      },
      {
        id: 5,
        titulo: "Hogwarts Legacy",
        preco: 229.99,
        desconto: 10,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
        descricao:
          "Mergulhe no mundo bruxo de Hogwarts no século XIX. Crie seu próprio bruxo e descubra segredos mágicos.",
        categoria: "RPG de Ação",
      },
      {
        id: 6,
        titulo: "The Witcher 3: Wild Hunt",
        preco: 89.99,
        desconto: 60,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        descricao:
          "Acompanhe Geralt de Rívia em sua busca épica por Ciri. Combate envolvente, escolhas impactantes e um dos melhores RPGs já feitos.",
        categoria: "RPG",
      },
      {
        id: 7,
        titulo: "God of War",
        preco: 159.99,
        desconto: 25,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
        descricao:
          "Kratos retorna em uma jornada emocional com seu filho Atreus. Uma releitura nórdica da lenda do Deus da Guerra.",
        categoria: "Ação e Aventura",
      },
      {
        id: 8,
        titulo: "FIFA 24",
        preco: 299.9,
        desconto: 15,
        imagem:
          "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
        descricao:
          "O mais recente simulador de futebol da EA Sports, com gráficos realistas e modo carreira renovado.",
        categoria: "Esportes",
      },
    ],
    []
  );

  const formatarMoeda = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <div id="outrosJogos" className="container w-75 my-5">
      <h2 className="text-uppercase text-center text-md-start ms-md-5 ps-md-3 mb-4 text-white fw-bold">
        Outros Jogos
      </h2>

      <div className="d-flex flex-column ms-md-5 ps-md-3 gap-4">
        {games.map((item) => (
          <div
            key={item.id}
            onClick={() => setJogoSelecionado(item)}
            style={{
              cursor: "pointer",
              backgroundColor: "#9b4de0",
              borderRadius: "5px",
              overflow: "hidden",
            }}
            className="d-flex flex-row align-items-center"
          >
            <img
              src={item.imagem}
              alt={item.titulo}
              style={{
                width: "200px",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="p-3 flex-grow-1 text-white">
              <h5 className="fw-bold mb-1">{item.titulo.toUpperCase()}</h5>
              <p className="mb-1" style={{ color: "#e0d3f8" }}>
                {item.categoria}
              </p>
              <h4 className="fw-bold">{formatarMoeda(item.preco)}</h4>
            </div>
            <div className="me-3">
              <button
                className="btn fw-bold"
                style={{
                  backgroundColor: "#ea84ff",
                  color: "white",
                  border: "none",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddCarrinho(item);
                }}
              >
                ADICIONAR AO CARRINHO
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {jogoSelecionado && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          tabIndex="-1"
          role="dialog"
          onClick={() => setJogoSelecionado(null)}
        >
          <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title">{jogoSelecionado.titulo}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setJogoSelecionado(null)}
                ></button>
              </div>
              <div className="modal-body row g-4">
                <div className="col-md-4 text-center">
                  <img
                    src={jogoSelecionado.imagem}
                    alt={jogoSelecionado.titulo}
                    className="img-fluid rounded"
                    style={{
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <p>
                    <strong>Gênero:</strong> {jogoSelecionado.categoria}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {jogoSelecionado.descricao}
                  </p>
                  <p>
                    <strong>Preço original:</strong>{" "}
                    {formatarMoeda(jogoSelecionado.preco)}
                  </p>
                  <p>
                    <strong>Desconto:</strong> {jogoSelecionado.desconto}%
                  </p>
                  <p>
                    <strong>Preço final:</strong>{" "}
                    {formatarMoeda(
                      jogoSelecionado.preco -
                        (jogoSelecionado.preco * jogoSelecionado.desconto) / 100
                    )}
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    onAddCarrinho(jogoSelecionado);
                    setJogoSelecionado(null);
                  }}
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setJogoSelecionado(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutrosJogos;
