from datetime import date, datetime
from enum import Enum
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict

class PrioridadeEnum(str, Enum):
    baixa = "baixa"
    media = "media"
    alta = "alta"

class StatusEnum(str, Enum):
    pendente = "pendente"
    em_andamento = "em_andamento"
    concluida = "concluida"

# Dados recebidos na criação (POST)
class TarefaCreate(BaseModel):
    titulo: str
    descricao: str
    data_limite: date
    prioridade: PrioridadeEnum
    status: StatusEnum

# Dados recebidos na atualização parcial (PATCH)
class TarefaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    data_limite: Optional[date] = None
    prioridade: Optional[PrioridadeEnum] = None
    status: Optional[StatusEnum] = None

# Resposta enviada ao frontend (sem expor usuario_id)
class TarefaResponse(BaseModel):
    id: UUID
    titulo: str
    descricao: str
    data_limite: date
    prioridade: PrioridadeEnum
    status: StatusEnum
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)