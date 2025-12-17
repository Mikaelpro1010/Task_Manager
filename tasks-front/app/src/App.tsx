import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { Auth } from './auth/Auth'
import { Home } from './pages/Home'

export default function App() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <p>Carregando sessão...</p>
  }

  return (
    <Routes>
      <Route path="/login" element={<Auth />} />

      <Route
        path="/"
        element={
          isAuthenticated ? <Home /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}
