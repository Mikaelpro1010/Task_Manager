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
        <button
          style={{
            border: 'none',
            padding: '0.3rem 0.9rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '0 6px 12px -8px rgba(124, 58, 237, 0.55)',
            transition: 'transform 0.15s ease, box-shadow 0.2s ease',
          }}
          onClick={() => setCreateOpen(true)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-1px)'
              event.currentTarget.style.boxShadow =
              '0 10px 20px -10px rgba(37, 99, 235, 0.4)'
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = ''
              event.currentTarget.style.boxShadow =
              '0 6px 12px -8px rgba(124, 58, 237, 0.55)'
            }}
        >
          + Nova tarefa
        </button>
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
                <button
                  style={{
                    border: 'none',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '999px',
                    background: 'rgba(37, 99, 235, 0.12)',
                    color: '#1d4ed8',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease, transform 0.15s',
                  }}
                  onClick={() => setEditTask(task)}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = 'rgba(37, 99, 235, 0.2)'
                    event.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = 'rgba(37, 99, 235, 0.12)'
                    event.currentTarget.style.transform = ''
                  }}
                >
                  Editar
                </button>
                <button
                  style={{
                    border: 'none',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '999px',
                    background: 'rgba(239, 68, 68, 0.14)',
                    color: '#b91c1c',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease, transform 0.15s',
                  }}
                  onClick={() => setDeleteTask(task)}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = 'rgba(220, 38, 38, 0.22)'
                    event.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = 'rgba(239, 68, 68, 0.14)'
                    event.currentTarget.style.transform = ''
                  }}
                >
                  Excluir
                </button>
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
