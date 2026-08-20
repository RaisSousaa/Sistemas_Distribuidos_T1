from datetime import date, datetime
from enum import Enum
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict
#biblioteca que garante que os dados estejam no formato correto, e que o frontend envie os dados corretos para a API. 

class PrioridadeEnum(str, Enum):
    baixa = "baixa"
    media = "media"
    alta = "alta"

class StatusEnum(str, Enum):
    pendente = "pendente"
    em_andamento = "em_andamento"
    concluida = "concluida"

# O que o frontend envia no POST
class TarefaCreate(BaseModel):
    titulo: str
    descricao: str
    data_limite: date
    prioridade: PrioridadeEnum
    status: StatusEnum

# O que o frontend pode enviar no PUT
class TarefaUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    data_limite: Optional[date] = None
    prioridade: Optional[PrioridadeEnum] = None
    status: Optional[StatusEnum] = None

# O que a API devolve (inclui campos gerados pelo backend/banco)
class TarefaResponse(BaseModel):
    id: UUID
    usuario_id: UUID
    titulo: str
    descricao: str
    data_limite: date
    prioridade: PrioridadeEnum
    status: StatusEnum
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)

#aqui é definido a estrutura dos dados 