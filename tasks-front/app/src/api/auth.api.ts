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

export type LoginResponse = {
    message: string
    user: AuthUser
    token: string
    token_type: string
}

export const AuthAPI = {
    async login(payload: LoginPayload) {
        const { data } = await api.post('/api/login', payload)
        return data as LoginResponse
    },

    async register(payload: RegisterPayload) {
        const { data } = await api.post('/api/register', payload)
        return data as { message: string }
    },

    async logout() {
        const { data } = await api.post('/api/logout')
        return data
    },

    async me() {
        const { data } = await api.get('/api/me')
        return data as AuthUser
    },
}
