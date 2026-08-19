const API_URL = import.meta.env.VITE_API_URL;

async function requisicao(endpoint, opcoes = {}, token = null) {
  const headers = {
    "Content-Type": "application/json",
    ...opcoes.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    ...opcoes,
    headers,
  });

  if (!resposta.ok) {
    let mensagem = "Ocorreu um erro na comunicação com o servidor.";

    try {
      const erro = await resposta.json();

      if (erro.detail) {
        mensagem = erro.detail;
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

export function listarTarefas(token) {
  return requisicao(
    "/tarefas",
    {
      method: "GET",
    },
    token
  );
}

export function criarTarefa(tarefa, token) {
  return requisicao(
    "/tarefas",
    {
      method: "POST",
      body: JSON.stringify(tarefa),
    },
    token
  );
}

export function atualizarTarefa(id, tarefa, token) {
  return requisicao(
    `/tarefas/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(tarefa),
    },
    token
  );
}

export function excluirTarefaApi(id, token) {
  return requisicao(
    `/tarefas/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}