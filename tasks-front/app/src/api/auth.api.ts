import { api } from './axios'

export type AuthUser = {
    id: number
    name: string
    email: string
}

export type LoginPayload = {
    email: string
    password: string
}

export type RegisterPayload = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export async function getCsrfCookie() {
    await api.get('/sanctum/csrf-cookie', {
        baseURL: 'http://api-tasks.test',
    })
}


export const AuthAPI = {
    async login(payload: LoginPayload) {
        await getCsrfCookie()

        const { data } = await api.post('/api/login', payload)
        return data as { message: string; user: AuthUser }
    },

    async register(payload: RegisterPayload) {
        await getCsrfCookie()

        const { data } = await api.post('/api/register', payload)
        return data as { message: string }
    },

    async logout() {
        await getCsrfCookie()

        const { data } = await api.post('/api/logout')
        return data
    },

    async me() {
        const { data } = await api.get('/api/me')
        return data as AuthUser
    },
}
