import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Usuario = () => {
  const [abaAtiva, setAbaAtiva] = useState('dados');
  const [editando, setEditando] = useState(false);
  const [editandoCartao, setEditandoCartao] = useState(false);

  // Estado para os dados do usuário
  const [nomeUsuario, setNomeUsuario] = useState('Emanuelly Lima');
  const [dataNascimento, setDataNascimento] = useState('25/01/2008');
  const [telefone, setTelefone] = useState('');
  const [chavePix, setChavePix] = useState('');
  const [email, setEmail] = useState('');

  const [numeroCartao, setNumeroCartao] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');

  const [cpf, setCpf] = useState('');

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
  
    return resto === parseInt(cpf.charAt(10));
  };
  
  const validarNumeroCartao = (numero) => {
    const num = numero.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(num)) return false;
  
    // Algoritmo de Luhn
    let soma = 0;
    for (let i = 0; i < num.length; i++) {
      let digito = parseInt(num.charAt(num.length - 1 - i));
      if (i % 2 === 1) {
        digito *= 2;
        if (digito > 9) digito -= 9;
      }
      soma += digito;
    }
    return soma % 10 === 0;
  };

  const renderCartaoVisual = () => (
    <div style={{ backgroundColor: '#999', padding: '20px', borderRadius: '10px', color: 'white', width: '300px', height: '180px', position: 'relative' }}>
      <div style={{ marginBottom: '20px', fontSize: '18px' }}>💳 Cartão</div>
      <div style={{ fontSize: '20px', letterSpacing: '2px', marginBottom: '10px' }}>
        {numeroCartao || '•••• •••• •••• ••••'}
      </div>
      <div style={{ fontSize: '14px' }}>NOME</div>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{nomeCartao || 'NOME COMPLETO'}</div>
      {validadeCartao && (
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '14px' }}>
          Validade {validadeCartao}
        </div>
      )}
    </div>
  );

  const renderConteudo = () => {
    switch (abaAtiva) {
      case 'dados':
        return (
          <div>
            <h4>Meus Dados</h4>
            {!editando ? (
              <div>
                <p><strong>Nome:</strong> {nomeUsuario}</p>
                <p><strong>Data de nascimento:</strong> {dataNascimento}</p>
                <button className="btn btn-outline-primary" onClick={() => setEditando(true)}>Editar</button>
              </div>
            ) : (
              <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!validarCPF(cpf)) {
                  alert('CPF inválido');
                  return;
                }
                setEditando(false);
              }}
              >
                <div className="mb-3">
                  <label className="form-label">Nome completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite seu nome completo"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Data de Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </div>
                <div className="mb-3">
  <label className="form-label">CPF</label>
  <input
    type="text"
    className="form-control"
    placeholder="000.000.000-00"
    value={cpf}
    onChange={(e) => setCpf(e.target.value)}
  />
</div>

                <div className="mb-3">
                  <label className="form-label">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Digite seu número"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Chave PIX</label>
                  <input
                    type="text"
                    className="form-control"
                    value={chavePix}
                    onChange={(e) => setChavePix(e.target.value)}
                    placeholder="Digite sua chave pix"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </form>
            )}
          </div>
        );

      case 'cartoes':
        return (
          <div>
            <h4>Cartão</h4>
            <div className="row">
              <div className="col-md-6">
                {!editandoCartao ? (
                  <div>
                    <p><strong>Número:</strong> {numeroCartao || '•••• •••• •••• ••••'}</p>
                    <p><strong>Nome:</strong> {nomeCartao || 'NOME COMPLETO'}</p>
                    <p><strong>Validade:</strong> {validadeCartao || 'MM/AA'}</p>
                    <button className="btn btn-outline-primary" onClick={() => setEditandoCartao(true)}>Editar</button>
                  </div>
                ) : (
                  <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!validarNumeroCartao(numeroCartao)) {
                      alert('Número do cartão inválido');
                      return;
                    }
                    setEditandoCartao(false);
                  }}
                  >
                    <div className="mb-3">
                      <label className="form-label">*Número do cartão</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0000 0000 0000 0000"
                        value={numeroCartao}
                        onChange={(e) => setNumeroCartao(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">*Nome impresso no cartão</label>
                      <input
                        type="text"
                        className="form-control"
                        value={nomeCartao}
                        onChange={(e) => setNomeCartao(e.target.value)}
                        placeholder="NOME COMPLETO"
                      />
                    </div>
                    <div className="mb-3 d-flex gap-3">
                      <div style={{ flex: 1 }}>
                        <label className="form-label">*Validade</label>
                        <input
                          type="text"
                          className="form-control"
                          value={validadeCartao}
                          onChange={(e) => setValidadeCartao(e.target.value)}
                          placeholder="MM/AA"
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label className="form-label">*Código de segurança</label>
                        <input type="text" className="form-control" placeholder="CVV" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                  </form>
                )}
              </div>
              <div className="col-md-6 d-flex align-items-center justify-content-center">
                {renderCartaoVisual()}
              </div>
            </div>
          </div>
        );

      case 'sair':
        return (
          <div>
            <h4>Sair da conta?</h4>
            <button className="btn btn-primary">Sair</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button onClick={() => { setAbaAtiva('dados'); setEditando(false); }} className={`list-group-item list-group-item-action ${abaAtiva === 'dados' ? 'active' : ''}`}>
              Editar Meus Dados
            </button>
            <button onClick={() => { setAbaAtiva('cartoes'); setEditandoCartao(false); }} className={`list-group-item list-group-item-action ${abaAtiva === 'cartoes' ? 'active' : ''}`}>
              Cartões
            </button>
            <button onClick={() => setAbaAtiva('sair')} className="list-group-item list-group-item-action text-danger">
              Sair
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card p-4 shadow-sm">
            {renderConteudo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
