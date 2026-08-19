function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <strong className="cabecalho-logo">Tarefas</strong>

        <div className="cabecalho-usuario">
          <span>usuario@email.com</span>
          <button className="botao-sair">Sair</button>
        </div>
      </div>
    </header>
  );
}

export default Cabecalho;