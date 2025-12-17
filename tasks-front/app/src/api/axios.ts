import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://api-tasks.test',
  withCredentials: true, // cookies automáticos (Sanctum)
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

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
