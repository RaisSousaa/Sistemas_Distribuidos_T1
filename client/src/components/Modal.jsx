function Modal({ titulo, aoFechar, children }) {
  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div
        className="modal-conteudo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="modal-cabecalho">
          <h2>{titulo}</h2>

          <button
            className="modal-fechar"
            onClick={aoFechar}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;