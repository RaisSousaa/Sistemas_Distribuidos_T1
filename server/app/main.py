from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tarefas

app = FastAPI(
    title="API de Gerenciamento de Tarefas",
    description="Backend em FastAPI integrado ao Supabase",
    version="1.0.0"
)

# Configuração de CORS para permitir requisições do frontend React/Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra as rotas sob o prefixo /api -> /api/tarefas
app.include_router(tarefas.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "API online e operante"}