import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Tarefas from "./pages/Tarefas";

import { supabase } from "./services/supabase";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [telaAuth, setTelaAuth] = useState("login");

  useEffect(() => {
    async function carregarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUsuario(session?.user ?? null);
      setCarregando(false);
    }

    carregarSessao();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (evento, session) => {
        setUsuario(session?.user ?? null);
        setCarregando(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (carregando) {
    return (
      <div className="carregando-aplicacao">
        Carregando...
      </div>
    );
  }

  if (!usuario) {
    if (telaAuth === "cadastro") {
      return (
        <Cadastro
          aoCadastrar={() => setTelaAuth("login")}
          aoVoltarLogin={() => setTelaAuth("login")}
        />
      );
    }

    return (
      <Login
        aoCadastrar={() => setTelaAuth("cadastro")}
      />
    );
  }

  return <Tarefas usuario={usuario} />;
}

export default App;