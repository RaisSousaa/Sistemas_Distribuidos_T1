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
        <strong className="cabecalho-logo">
          Tarefas
        </strong>

        <div className="cabecalho-usuario">
          <span>{emailUsuario}</span>

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