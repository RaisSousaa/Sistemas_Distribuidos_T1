import { useEffect, useState } from "react";

import Cabecalho from "../components/Cabecalho";
import Modal from "../components/Modal";
import TarefaCard from "../components/TarefaCard";
import TarefaForm from "../components/TarefaForm";

import {
  listarTarefas,
  criarTarefa,
} from "../services/api";

function Tarefas({ usuario }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [carregandoTarefas, setCarregandoTarefas] = useState(true);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setCarregandoTarefas(true);

        const dados = await listarTarefas();

        setTarefas(dados);
      } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);

        mostrarMensagemErro(
          erro.message || "Não foi possível carregar as tarefas."
        );
      } finally {
        setCarregandoTarefas(false);
      }
    }

    carregarTarefas();
  }, []);


  async function adicionarTarefa(novaTarefa) {
    try {
      const tarefaCriada = await criarTarefa(novaTarefa);

      setTarefas((tarefasAtuais) => [
        tarefaCriada,
        ...tarefasAtuais,
      ]);

      setModalAberto(false);

      mostrarMensagemSucesso(
        "Tarefa criada com sucesso."
      );
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);

      mostrarMensagemErro(
        erro.message || "Não foi possível criar a tarefa."
      );
    }
  }

  function abrirEdicao(tarefa) {
    setTarefaEmEdicao(tarefa);
    setModalAberto(true);
  }

  function editarTarefa(tarefaAtualizada) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.map((tarefa) =>
        tarefa.id === tarefaAtualizada.id
          ? tarefaAtualizada
          : tarefa
      )
    );

    setTarefaEmEdicao(null);
    setModalAberto(false);

    mostrarMensagemSucesso("Tarefa atualizada com sucesso.");
  }
  function excluirTarefa(id) {
    setTarefas((tarefasAtuais) =>
      tarefasAtuais.filter((tarefa) => tarefa.id !== id)
    );

    setTarefaParaExcluir(null);

    mostrarMensagemSucesso("Tarefa excluída com sucesso.");
  }
  function solicitarExclusao(tarefa) {
  setTarefaParaExcluir(tarefa);
  }
  function mostrarMensagemSucesso(mensagem) {
    setMensagemSucesso(mensagem);

    setTimeout(() => {
      setMensagemSucesso("");
    }, 3000);
  }
  function mostrarMensagemErro(mensagem) {
    setMensagemErro(mensagem);

    setTimeout(() => {
      setMensagemErro("");
    }, 4000);
  }

  return (
    <>
      <Cabecalho emailUsuario={usuario.email} />

      <main className="pagina-tarefas">
        <div className="tarefas-cabecalho">
          <div>
            <h1>Minhas tarefas</h1>
            <p>Organize e acompanhe suas atividades.</p>
          </div>
          {mensagemSucesso && (
            <div className="mensagem-sucesso">
              <span>✓</span>
              <span>{mensagemSucesso}</span>
            </div>
          )}
          {mensagemErro && (
            <div className="mensagem-erro">
              <span>!</span>
              <span>{mensagemErro}</span>
            </div>
          )}

          <button
            className="botao-nova-tarefa"
            onClick={() => {
              setTarefaEmEdicao(null);
              setModalAberto(true);
            }}
          >
            + Nova tarefa
          </button>
        </div>

        {carregandoTarefas ? (
          <div className="carregando-tarefas">
            Carregando tarefas...
          </div>
        ) : tarefas.length === 0 ? (
          <div className="estado-vazio">
            <div className="estado-vazio-icone">✓</div>

            <h2>Nenhuma tarefa cadastrada</h2>

            <p>
              Crie sua primeira tarefa para começar a organizar suas atividades.
            </p>

            <button
              className="botao-nova-tarefa"
              onClick={() => {
                setTarefaEmEdicao(null);
                setModalAberto(true);
              }}
            >
              + Criar primeira tarefa
            </button>
          </div>
        ) : (
          <div className="lista-tarefas">
            {tarefas.map((tarefa) => (
              <TarefaCard
                key={tarefa.id}
                tarefa={tarefa}
                aoEditar={abrirEdicao}
                aoExcluir={solicitarExclusao}
              />
            ))}
          </div>
        )}
      </main>
      {modalAberto && (
        <Modal
          titulo={
            tarefaEmEdicao
              ? "Editar Tarefa"
              : "Criar Nova Tarefa"
          }
          aoFechar={() => {
            setModalAberto(false);
            setTarefaEmEdicao(null);
          }}
        >
          <TarefaForm
            tarefaInicial={tarefaEmEdicao}
            aoCancelar={() => {
              setModalAberto(false);
              setTarefaEmEdicao(null);
            }}
            aoCriar={adicionarTarefa}
            aoEditar={editarTarefa}
          />
        </Modal>
      )}

    {tarefaParaExcluir && (
      <Modal
        titulo="Excluir tarefa?"
        aoFechar={() => setTarefaParaExcluir(null)}
      >
        <div className="confirmacao-exclusao">
          <p>
            Tem certeza de que deseja excluir a tarefa{" "}
            <strong>{tarefaParaExcluir.titulo}</strong>?
          </p>

          <p className="texto-alerta">
            Esta ação não poderá ser desfeita.
          </p>

          <div className="acoes-confirmacao">
            <button
              className="botao-cancelar"
              onClick={() => setTarefaParaExcluir(null)}
            >
              Cancelar
            </button>

            <button
              className="botao-confirmar-exclusao"
              onClick={() => excluirTarefa(tarefaParaExcluir.id)}
            >
              Excluir
            </button>
          </div>
        </div>
      </Modal>
    )}
    </>
  );
}


export default Tarefas;