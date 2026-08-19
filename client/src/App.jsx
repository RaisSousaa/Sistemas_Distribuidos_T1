import { useState } from "react";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Tarefas from "./pages/Tarefas";

function App() {
  const [usuario, setUsuario] = useState(null);
  const [telaAuth, setTelaAuth] = useState("login");

  function entrar(email) {
    setUsuario({
      email: email,
    });
  }

  function cadastrar() {
    setTelaAuth("login");
  }

  if (!usuario) {
    if (telaAuth === "cadastro") {
      return (
        <Cadastro
          aoCadastrar={cadastrar}
          aoVoltarLogin={() => setTelaAuth("login")}
        />
      );
    }

    return (
      <Login
        aoEntrar={entrar}
        aoCadastrar={() => setTelaAuth("cadastro")}
      />
    );
  }

  return <Tarefas />;
}

export default App;