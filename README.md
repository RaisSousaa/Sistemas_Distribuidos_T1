# Sistemas Distribuídos - Trabalho 01

Sistema distribuído de gerenciamento de tarefas desenvolvido como trabalho da disciplina de Sistemas Distribuídos.

A aplicação permite que usuários realizem cadastro e autenticação, além de criar, visualizar, editar e excluir suas próprias tarefas.

## Tecnologias

### Frontend

- React
- Vite
- JavaScript
- Supabase Auth

### Backend

- Python
- FastAPI
- Supabase
- PostgreSQL
- Pytest

## Estrutura do Projeto

```text
Sistemas_Distribuidos_T1/
│
├── client/             # Frontend React
├── server/             # Backend FastAPI
├── docs/               # Documentação
├── .gitignore
└── README.md
```

## Funcionalidades

- Cadastro de usuário
- Login com e-mail e senha
- Persistência da sessão
- Logout
- Listagem de tarefas
- Criação de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Confirmação antes da exclusão
- Isolamento das tarefas por usuário
- Mensagens de sucesso e erro
- Estado vazio quando não existem tarefas

## Arquitetura

O frontend React utiliza o Supabase Auth para autenticação dos usuários.

Após o login, o Supabase fornece um token JWT, que é enviado pelo frontend ao backend FastAPI através do cabeçalho:

```text
Authorization: Bearer <token>
```

O FastAPI valida o usuário e realiza as operações sobre as tarefas armazenadas no PostgreSQL através do Supabase.

Fluxo simplificado:

```text
React
  |
  | Supabase Auth
  v
JWT
  |
  v
FastAPI
  |
  v
Supabase / PostgreSQL
```

## Configuração do Frontend

Entre na pasta:

```bash
cd client
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` baseado em `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Depois execute:

```bash
npm run dev
```

O frontend ficará disponível normalmente em:

```text
http://localhost:5173
```

## Configuração do Backend

Entre na pasta:

```bash
cd server
```

Crie o ambiente virtual:

```bash
python -m venv venv
```

### Windows

Ative com:

```powershell
.\venv\Scripts\Activate.ps1
```

### Linux/macOS

```bash
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Crie um arquivo `.env` baseado em `.env.example`:

```env
SUPABASE_URL=
SUPABASE_KEY=
```

A variável `SUPABASE_KEY` deve utilizar uma chave apropriada para execução no backend e nunca deve ser exposta no frontend ou versionada no Git.

Execute a API:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

A documentação Swagger estará disponível em:

```text
http://127.0.0.1:8000/docs
```

## API

Principais endpoints:

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/api/tarefas` | Lista as tarefas do usuário |
| POST | `/api/tarefas` | Cria uma nova tarefa |
| GET | `/api/tarefas/{id}` | Consulta uma tarefa |
| PUT | `/api/tarefas/{id}` | Atualiza uma tarefa |
| DELETE | `/api/tarefas/{id}` | Exclui uma tarefa |

Todos os endpoints de tarefas exigem autenticação.

## Testes

Para executar os testes do backend:

```bash
cd server
pytest -q
```

## Build do Frontend

Para verificar a compilação do frontend:

```bash
cd client
npm run build
```

Para verificar o código com o linter:

```bash
npm run lint
```

## Segurança

Os arquivos `.env` não são versionados.

O frontend utiliza somente a chave pública do Supabase.

A chave secreta utilizada pelo backend deve permanecer exclusivamente no servidor e nunca deve ser enviada ao navegador ou incluída no repositório.