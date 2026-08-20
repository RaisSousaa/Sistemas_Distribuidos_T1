def test_criar_tarefa_sucesso(authenticated_client):
    """Valida criacao de tarefa via POST."""
    payload = {
        "titulo": "Implementar testes no backend",
        "descricao": "Testar rotas CRUD com pytest",
        "data_limite": "2026-08-30",
        "prioridade": "alta",
        "status": "pendente"
    }
    response = authenticated_client.post("/api/tarefas", json=payload)
    assert response.status_code == 201
    dados = response.json()
    assert dados["titulo"] == payload["titulo"]
    assert dados["prioridade"] == "alta"
    assert dados["status"] == "pendente"
    assert "id" in dados
    assert "usuario_id" not in dados  # Conforme contrato

def test_criar_tarefa_dados_invalidos(authenticated_client):
    """Valida que payload incompleto retorna erro 422."""
    payload_incompleto = {
        "titulo": "Tarefa sem prioridade nem status"
    }
    response = authenticated_client.post("/api/tarefas", json=payload_incompleto)
    assert response.status_code == 422

def test_listar_tarefas(authenticated_client):
    """Valida listagem de tarefas via GET."""
    response = authenticated_client.get("/api/tarefas")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_atualizar_tarefa(authenticated_client):
    """Valida atualizacao parcial via PATCH."""
    # 1. Cria tarefa inicial
    payload_criacao = {
        "titulo": "Tarefa para Atualizar",
        "descricao": "Descricao inicial",
        "data_limite": "2026-08-30",
        "prioridade": "baixa",
        "status": "pendente"
    }
    res_criacao = authenticated_client.post("/api/tarefas", json=payload_criacao)
    assert res_criacao.status_code == 201
    tarefa_id = res_criacao.json()["id"]

    # 2. Atualiza status e prioridade via PATCH
    payload_update = {
        "status": "em_andamento",
        "prioridade": "media"
    }
    res_update = authenticated_client.patch(f"/api/tarefas/{tarefa_id}", json=payload_update)
    assert res_update.status_code == 200
    assert res_update.json()["status"] == "em_andamento"
    assert res_update.json()["prioridade"] == "media"

def test_deletar_tarefa(authenticated_client):
    """Valida exclusao via DELETE."""
    # 1. Cria tarefa para deletar
    payload = {
        "titulo": "Tarefa a deletar",
        "descricao": "Temporaria",
        "data_limite": "2026-08-30",
        "prioridade": "baixa",
        "status": "pendente"
    }
    res_criacao = authenticated_client.post("/api/tarefas", json=payload)
    tarefa_id = res_criacao.json()["id"]

    # 2. Deleta
    res_delete = authenticated_client.delete(f"/api/tarefas/{tarefa_id}")
    assert res_delete.status_code == 204

    # 3. Confirma que nao existe mais
    res_get = authenticated_client.get(f"/api/tarefas/{tarefa_id}")
    assert res_get.status_code == 404