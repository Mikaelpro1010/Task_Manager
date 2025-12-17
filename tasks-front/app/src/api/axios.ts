import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://api-tasks.test',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

const TOKEN_STORAGE_KEY = 'task-manager::token'

const readToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null
  }
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

const applyAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

const initialToken = readToken()
if (initialToken) {
  applyAuthHeader(initialToken)
}

export const authToken = {
  get: readToken,
  set(token: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
    }
    applyAuthHeader(token)
  },
  clear() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
    applyAuthHeader(null)
  },
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.[
        Object.keys(error.response?.data?.errors || {})[0]
      ]?.[0] ||
      'Erro inesperado'

    return Promise.reject(new Error(message))
  }
)
