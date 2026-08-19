def test_acesso_sem_token_deve_falhar(client):
    """Verifica se requisições sem o token são bloqueadas."""
    response = client.get("/api/tarefas")
    assert response.status_code in [401, 403]

def test_acesso_token_invalido_deve_falhar(client):
    """Verifica se token inválido é rejeitado."""
    headers = {"Authorization": "Bearer token_falso_123"}
    response = client.get("/api/tarefas", headers=headers)
    assert response.status_code == 401