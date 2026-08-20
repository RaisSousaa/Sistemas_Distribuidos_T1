function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarPrioridade(prioridade) {
  const nomes = {
    baixa: "Baixa",
    media: "Média",
    alta: "Alta",
  };

  return nomes[prioridade] || prioridade;
}

function formatarStatus(status) {
  const nomes = {
    pendente: "Pendente",
    em_andamento: "Em andamento",
    concluida: "Concluída",
  };

  return nomes[status] || status;
}

function TarefaCard({ tarefa, aoEditar, aoExcluir }) {
  return (
    <article className="tarefa-card">
      <h2>{tarefa.titulo}</h2>

      <p className="tarefa-descricao">
        {tarefa.descricao}
      </p>

      <div className="tarefa-divisor" />

      <div className="tarefa-info">
        <span>
          📅 {formatarData(tarefa.data_limite)}
        </span>

        <span className={`prioridade prioridade-${tarefa.prioridade}`}>
          {formatarPrioridade(tarefa.prioridade)}
        </span>

        <span className={`status status-${tarefa.status}`}>
          {formatarStatus(tarefa.status)}
        </span>
      </div>

      <div className="tarefa-acoes">
        <button
          className="botao-editar"
          onClick={() => aoEditar(tarefa)}
        >
          Editar
        </button>

        <button
          className="botao-excluir"
          onClick={() => aoExcluir(tarefa)}
        >
        Excluir
        </button>
      </div>
    </article>
  );
}

export default TarefaCard;