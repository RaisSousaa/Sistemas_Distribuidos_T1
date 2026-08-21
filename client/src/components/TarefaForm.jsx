import { useState } from "react";

function TarefaForm({
  aoCancelar,
  aoCriar,
  aoEditar,
  tarefaInicial,
  carregando,
}) {
  const [titulo, setTitulo] = useState(
    tarefaInicial?.titulo || ""
  );

  const [descricao, setDescricao] = useState(
    tarefaInicial?.descricao || ""
  );

  const [dataLimite, setDataLimite] = useState(
    tarefaInicial?.data_limite || ""
  );

  const [prioridade, setPrioridade] = useState(
    tarefaInicial?.prioridade || "media"
  );

  const [status, setStatus] = useState(
    tarefaInicial?.status || "pendente"
  );


  function handleSubmit(evento) {
    evento.preventDefault();

    const dadosTarefa = {
        titulo: titulo,
        descricao: descricao,
        data_limite: dataLimite,
        prioridade: prioridade,
        status: status,
    };

    if (tarefaInicial) {
        aoEditar({
        ...tarefaInicial,
        ...dadosTarefa,
        });
    } else {
        aoCriar(dadosTarefa);
    }
}

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
      <div className="campo-formulario">
        <label htmlFor="titulo">Título</label>

        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Ex: Finalizar trabalho de SD"
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="descricao">Descrição</label>

        <textarea
          id="descricao"
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
          placeholder="Descreva brevemente a tarefa..."
          rows="4"
          required
          disabled={carregando}
        />
      </div>

      <div className="linha-formulario">
        <div className="campo-formulario">
          <label htmlFor="data_limite">Data limite</label>

          <input
            id="data_limite"
            type="date"
            value={dataLimite}
            onChange={(evento) => setDataLimite(evento.target.value)}
            required
            disabled={carregando}
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="prioridade">Prioridade</label>

          <select
            id="prioridade"
            value={prioridade}
            onChange={(evento) => setPrioridade(evento.target.value)}
            disabled={carregando}
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
      </div>

      <div className="campo-formulario">
        <label htmlFor="status">Status</label>

        <select
          id="status"
          value={status}
          onChange={(evento) => setStatus(evento.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluída</option>
        </select>
      </div>

      <div className="acoes-formulario">
        <button
          type="button"
          className="botao-cancelar"
          onClick={aoCancelar}
          disabled={carregando}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="botao-criar"
          disabled={carregando}
        >
          {carregando ? (
            <>
              <span className="spinner"></span>
              {tarefaInicial ? "Salvando..." : "Criando..."}
            </>
          ) : (
            tarefaInicial ? "Salvar alterações" : "Criar tarefa"
          )}
        </button>
      </div>
    </form>
  );
}

export default TarefaForm;