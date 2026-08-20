import { supabase } from "../services/supabase";

function Cabecalho({ emailUsuario }) {
  async function sair() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
    }
  }

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <div className="cabecalho-marca">
          <span className="cabecalho-logo-icone">✓</span>
          <strong className="cabecalho-logo">Tarefas</strong>
        </div>

        <div className="cabecalho-usuario">
          <div className="usuario-avatar">
            {emailUsuario?.charAt(0).toUpperCase()}
          </div>

          <span className="usuario-email">
            {emailUsuario}
          </span>

          <button
            className="botao-sair"
            onClick={sair}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default Cabecalho;