import { useState } from "react";

function Login({ aoEntrar, aoCadastrar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();

    setErro("");

    if (!email.trim() || !senha.trim()) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }

    // Login temporário enquanto o Supabase ainda não está integrado.
    aoEntrar(email);
  }

  return (
    <main className="pagina-login">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icone">✓</span>
          <span>Tarefas</span>
        </div>

        <div className="login-cabecalho">
          <h1>Entrar</h1>

          <p>
            Acesse sua conta para gerenciar suas tarefas.
          </p>
        </div>

        {erro && (
          <div className="login-erro">
            <span>!</span>
            <p>{erro}</p>
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <div className="campo-formulario">
            <label htmlFor="email">E-mail</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(evento) =>
                setEmail(evento.target.value)
              }
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="senha">Senha</label>

            <div className="campo-senha">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(evento) =>
                  setSenha(evento.target.value)
                }
                placeholder="Digite sua senha"
                required
              />

              <button
                type="button"
                className="botao-mostrar-senha"
                onClick={() =>
                  setMostrarSenha((valorAtual) => !valorAtual)
                }
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="botao-login"
          >
            Entrar
          </button>
        </form>

        <div className="login-rodape">
          <span>Ainda não possui uma conta?</span>

          <button
            type="button"
            className="link-login"
            onClick={aoCadastrar}
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </main>
  );
}

export default Login;