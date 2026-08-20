import { useState } from "react";

import { supabase } from "../services/supabase";

function Cadastro({ aoCadastrar, aoVoltarLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(evento) {
  evento.preventDefault();

  setErro("");

  if (!email.trim() || !senha.trim() || !confirmarSenha.trim()) {
    setErro("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmarSenha) {
    setErro("As senhas não coincidem.");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    });

    if (error) {
      throw error;
    }

    console.log("Usuário criado:", data.user);

    aoCadastrar();
  } catch (error) {
    console.error(error);

    setErro(
      error.message || "Não foi possível realizar o cadastro."
    );
  }
}

  return (
    <main className="pagina-login">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icone">✓</span>
          <span>Tarefas</span>
        </div>

        <div className="login-cabecalho">
          <h1>Criar conta</h1>

          <p>
            Cadastre-se para começar a organizar suas tarefas.
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
            <label htmlFor="cadastro-email">
              E-mail
            </label>

            <input
              id="cadastro-email"
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
            <label htmlFor="cadastro-senha">
              Senha
            </label>

            <div className="campo-senha">
              <input
                id="cadastro-senha"
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
                  setMostrarSenha(
                    (valorAtual) => !valorAtual
                  )
                }
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div className="campo-formulario">
            <label htmlFor="confirmar-senha">
              Confirmar senha
            </label>

            <input
              id="confirmar-senha"
              type={mostrarSenha ? "text" : "password"}
              value={confirmarSenha}
              onChange={(evento) =>
                setConfirmarSenha(evento.target.value)
              }
              placeholder="Digite novamente sua senha"
              required
            />
          </div>

          <button
            type="submit"
            className="botao-login"
          >
            Cadastrar
          </button>
        </form>

        <div className="login-rodape">
          <span>Já possui uma conta?</span>

          <button
            type="button"
            className="link-login"
            onClick={aoVoltarLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}

export default Cadastro;