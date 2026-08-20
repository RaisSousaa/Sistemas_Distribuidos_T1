import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL;

async function obterToken() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Não foi possível recuperar a sessão.");
  }

  if (!session?.access_token) {
    throw new Error("Usuário não autenticado.");
  }

  return session.access_token;
}

async function requisicao(endpoint, opcoes = {}) {
  const token = await obterToken();

  const headers = {
    ...opcoes.headers,
    Authorization: `Bearer ${token}`,
  };

  if (opcoes.body) {
    headers["Content-Type"] = "application/json";
  }

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    ...opcoes,
    headers,
  });

  if (!resposta.ok) {
    let mensagem = "Erro na comunicação com o servidor.";

    try {
      const dadosErro = await resposta.json();

      if (dadosErro.detail) {
        mensagem = dadosErro.detail;
      }
    } catch {
      // Mantém a mensagem padrão.
    }

    throw new Error(mensagem);
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json();
}

export function listarTarefas() {
  return requisicao("/tarefas", {
    method: "GET",
  });
}

export function criarTarefa(tarefa) {
  return requisicao("/tarefas", {
    method: "POST",
    body: JSON.stringify(tarefa),
  });
}

export function atualizarTarefa(id, tarefa) {
  return requisicao(`/tarefas/${id}`, {
    method: "PUT",
    body: JSON.stringify(tarefa),
  });
}

export function excluirTarefaApi(id) {
  return requisicao(`/tarefas/${id}`, {
    method: "DELETE",
  });
}