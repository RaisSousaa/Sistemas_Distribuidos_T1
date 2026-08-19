from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from app.auth import get_current_user, supabase
from app.schemas import TarefaCreate, TarefaResponse, TarefaUpdate

router = APIRouter(prefix="/tarefas", tags=["Tarefas"])

@router.post("", response_model=TarefaResponse, status_code=status.HTTP_201_CREATED)
def criar_tarefa(tarefa: TarefaCreate, user_id: str = Depends(get_current_user)):
    payload = tarefa.model_dump()
    payload["data_limite"] = str(payload["data_limite"])
    payload["usuario_id"] = user_id

    response = supabase.table("tarefas").insert(payload).execute()
    if not response.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Erro ao criar a tarefa.")
    return response.data[0]

@router.get("", response_model=List[TarefaResponse])
def listar_tarefas(user_id: str = Depends(get_current_user)):
    response = supabase.table("tarefas").select("*").eq("usuario_id", user_id).execute()
    return response.data

@router.get("/{tarefa_id}", response_model=TarefaResponse)
def obter_tarefa(tarefa_id: UUID, user_id: str = Depends(get_current_user)):
    response = supabase.table("tarefas").select("*").eq("id", str(tarefa_id)).eq("usuario_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tarefa não encontrada.")
    return response.data[0]

@router.put("/{tarefa_id}", response_model=TarefaResponse)
def atualizar_tarefa(tarefa_id: UUID, tarefa: TarefaUpdate, user_id: str = Depends(get_current_user)):
    dados_atualizacao = {k: v for k, v in tarefa.model_dump().items() if v is not None}
    if "data_limite" in dados_atualizacao:
        dados_atualizacao["data_limite"] = str(dados_atualizacao["data_limite"])

    if not dados_atualizacao:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nenhum dado informado para atualização.")

    response = (
        supabase.table("tarefas")
        .update(dados_atualizacao)
        .eq("id", str(tarefa_id))
        .eq("usuario_id", user_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tarefa não encontrada ou não autorizada.")
    return response.data[0]

@router.delete("/{tarefa_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_tarefa(tarefa_id: UUID, user_id: str = Depends(get_current_user)):
    response = (
        supabase.table("tarefas")
        .delete()
        .eq("id", str(tarefa_id))
        .eq("usuario_id", user_id)
        .execute()
    )
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tarefa não encontrada ou não autorizada.")
    return None