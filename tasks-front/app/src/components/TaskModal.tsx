import { useState } from 'react'
import { Task, TaskStatus } from '../api/tasks.api'

type Props = {
  title: string
  initialData?: Task
  onClose: () => void
  onSubmit: (data: { title: string; status: TaskStatus }) => void
}

export function TaskModal({ title, initialData, onClose, onSubmit }: Props) {
  const [taskTitle, setTaskTitle] = useState(initialData?.title ?? '')
  const [status, setStatus] = useState<TaskStatus>(
    initialData?.status ?? 'EM_ANDAMENTO'
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ title: taskTitle, status })
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Título
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Status
            <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="CONCLUIDO">Concluído</option>
              <option value="CANCELADO">Cancelado</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
