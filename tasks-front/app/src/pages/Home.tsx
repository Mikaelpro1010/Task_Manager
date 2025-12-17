import { useEffect, useState } from 'react'
import { TasksAPI, Task, TaskStatus } from '../api/tasks.api'
import { TaskModal } from '../components/TaskModal'
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const [createOpen, setCreateOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [deleteTask, setDeleteTask] = useState<Task | null>(null)

  async function loadTasks() {
    setLoading(true)
    try {
      const data = await TasksAPI.list()
      setTasks(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  async function handleCreate(payload: { title: string; status: TaskStatus }) {
    await TasksAPI.create(payload)
    setCreateOpen(false)
    loadTasks()
  }

  async function handleUpdate(taskId: number, payload: any) {
    await TasksAPI.update(taskId, payload)
    setEditTask(null)
    loadTasks()
  }

  async function handleDelete(taskId: number) {
    await TasksAPI.remove(taskId)
    setDeleteTask(null)
    loadTasks()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1>Minhas Tarefas</h1>
        <button onClick={() => setCreateOpen(true)}>+ Nova tarefa</button>
      </header>

      {loading ? (
        <p>Carregando...</p>
      ) : tasks.length === 0 ? (
        <p>Nenhuma tarefa cadastrada.</p>
      ) : (
        <ul style={{ display: 'grid', gap: '0.75rem' }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{task.title}</strong>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  {task.status}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setEditTask(task)}>Editar</button>
                <button onClick={() => setDeleteTask(task)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* MODAIS */}
      {createOpen && (
        <TaskModal
          title="Nova tarefa"
          onClose={() => setCreateOpen(false)}
          onSubmit={handleCreate}
        />
      )}

      {editTask && (
        <TaskModal
          title="Editar tarefa"
          initialData={editTask}
          onClose={() => setEditTask(null)}
          onSubmit={(data) => handleUpdate(editTask.id, data)}
        />
      )}

      {deleteTask && (
        <ConfirmDeleteModal
          taskTitle={deleteTask.title}
          onCancel={() => setDeleteTask(null)}
          onConfirm={() => handleDelete(deleteTask.id)}
        />
      )}
    </div>
  )
}
