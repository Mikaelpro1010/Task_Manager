import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AuthAPI, type AuthUser, type LoginPayload } from '../api/auth.api'
import { authToken } from '../api/axios'

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  loading: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    if (!authToken.get()) {
      setUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const me = await AuthAPI.me()
      setUser(me)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await AuthAPI.login(payload)
    authToken.set(response.token)
    setUser(response.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await AuthAPI.logout()
    } finally {
      authToken.clear()
      setUser(null)
    }
  }, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, login, logout, refreshUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
