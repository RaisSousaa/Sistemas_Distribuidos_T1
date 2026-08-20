import pytest
from unittest.mock import MagicMock
from uuid import uuid4
from datetime import datetime, timezone
from fastapi.testclient import TestClient
from app.main import app
from app.auth import get_current_user
import app.routers.tarefas as tarefas_module

MOCK_USER_ID = "550e8400-e29b-41d4-a716-446655440000"

@pytest.fixture
def client():
    """Cliente HTTP padrão sem override de usuário."""
    return TestClient(app)

@pytest.fixture
def authenticated_client():
    """Cliente HTTP autenticado com mock do Supabase Database."""
    def override_get_current_user():
        return MOCK_USER_ID

    app.dependency_overrides[get_current_user] = override_get_current_user

    # Banco em memória para os testes
    banco_memoria = []

    mock_supabase = MagicMock()

    def mock_table(table_name):
        query_mock = MagicMock()
        
        # Simula .insert()
        def mock_insert(payload):
            exec_mock = MagicMock()
            def execute():
                novo_item = {
                    **payload,
                    "id": str(uuid4()),
                    "criado_em": datetime.now(timezone.utc).isoformat()
                }
                banco_memoria.append(novo_item)
                return MagicMock(data=[novo_item])
            exec_mock.execute = execute
            return exec_mock
        query_mock.insert = mock_insert

        # Simula .select().eq()
        def mock_select(fields):
            select_mock = MagicMock()
            def mock_eq(campo, valor):
                eq_mock = MagicMock()
                # Encadeamento de múltiplos .eq() (ex: id e usuario_id)
                def mock_second_eq(c2, v2):
                    sub_mock = MagicMock()
                    def sub_execute():
                        filtrados = [
                            t for t in banco_memoria 
                            if str(t.get(campo)) == str(valor) and str(t.get(c2)) == str(v2)
                        ]
                        return MagicMock(data=filtrados)
                    sub_mock.execute = sub_execute
                    return sub_mock
                
                def execute():
                    filtrados = [t for t in banco_memoria if str(t.get(campo)) == str(valor)]
                    return MagicMock(data=filtrados)
                
                eq_mock.execute = execute
                eq_mock.eq = mock_second_eq
                return eq_mock
            select_mock.eq = mock_eq
            return select_mock
        query_mock.select = mock_select

        # Simula .update()
        def mock_update(payload):
            update_mock = MagicMock()
            def mock_eq(c1, v1):
                eq_mock = MagicMock()
                def mock_second_eq(c2, v2):
                    sub_mock = MagicMock()
                    def sub_execute():
                        for item in banco_memoria:
                            if str(item.get(c1)) == str(v1) and str(item.get(c2)) == str(v2):
                                item.update(payload)
                                return MagicMock(data=[item])
                        return MagicMock(data=[])
                    sub_mock.execute = sub_execute
                    return sub_mock
                eq_mock.eq = mock_second_eq
                return eq_mock
            update_mock.eq = mock_eq
            return update_mock
        query_mock.update = mock_update

        # Simula .delete()
        def mock_delete():
            del_mock = MagicMock()
            def mock_eq(c1, v1):
                eq_mock = MagicMock()
                def mock_second_eq(c2, v2):
                    sub_mock = MagicMock()
                    def sub_execute():
                        for i, item in enumerate(banco_memoria):
                            if str(item.get(c1)) == str(v1) and str(item.get(c2)) == str(v2):
                                removido = banco_memoria.pop(i)
                                return MagicMock(data=[removido])
                        return MagicMock(data=[])
                    sub_mock.execute = sub_execute
                    return sub_mock
                eq_mock.eq = mock_second_eq
                return eq_mock
            del_mock.eq = mock_eq
            return del_mock
        query_mock.delete = mock_delete

        return query_mock

    mock_supabase.table = mock_table
    tarefas_module.supabase = mock_supabase

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()