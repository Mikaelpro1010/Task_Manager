import { api } from './axios'

/**
 * Enum que reflete o Enum do backend (PHP)
 */
export type TaskStatus =
  | 'EM_ANDAMENTO'
  | 'CONCLUIDO'
  | 'CANCELADO'

/**
 * Entidade Task
 */
export type Task = {
  id: number
  title: string
  status: TaskStatus
  user_id: number
  task_list_id: number | null
  created_at: string
  updated_at: string
}

/**
 * Payload para criação
 */
export type CreateTaskPayload = {
  title: string
  status?: TaskStatus
  task_list_id?: number | null
}

/**
 * Payload para atualização
 */
export type UpdateTaskPayload = {
  title?: string
  status?: TaskStatus
  task_list_id?: number | null
}

export const TasksAPI = {
  /**
   * GET /api/tasks
   */
  async list() {
    const { data } = await api.get<Task[]>('/api/tasks')
    return data
  },

  /**
   * GET /api/tasks/{id}
   */
  async getById(taskId: number) {
    const { data } = await api.get<Task>(`/api/tasks/${taskId}`)
    return data
  },

  /**
   * POST /api/tasks
   */
  async create(payload: CreateTaskPayload) {
    const { data } = await api.post<Task>('/api/tasks', payload)
    return data
  },

  /**
   * PUT /api/tasks/{id}
   */
  async update(taskId: number, payload: UpdateTaskPayload) {
    const { data } = await api.put<Task>(`/api/tasks/${taskId}`, payload)
    return data
  },

  /**
   * DELETE /api/tasks/{id}
   */
  async remove(taskId: number) {
    await api.delete(`/api/tasks/${taskId}`)
  },
}
