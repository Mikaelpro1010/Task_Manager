type Props = {
  taskTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDeleteModal({ taskTitle, onConfirm, onCancel }: Props) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Excluir tarefa</h2>
        <p>Tem certeza que deseja excluir <strong>{taskTitle}</strong>?</p>

        <div className="modal-actions">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  )
}
