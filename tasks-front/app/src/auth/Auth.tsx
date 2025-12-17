import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Login } from './Login/Login'
import { Register } from './Register/Register'

type View = 'login' | 'register'

export function Auth() {
  const [view, setView] = useState<View>('login')
  const navigate = useNavigate()

  return (
    <main className="auth-wrapper">
      <section className="auth-card">
        <header className="auth-header">
          <h1>Task Manager</h1>
          <p>Entre com sua conta ou crie um novo acesso.</p>
        </header>

        <div className="auth-toggle">
          <button
            className={view === 'login'
              ? 'auth-toggle__button auth-toggle__button--active'
              : 'auth-toggle__button'}
            onClick={() => setView('login')}
          >
            Entrar
          </button>

          <button
            className={view === 'register'
              ? 'auth-toggle__button auth-toggle__button--active'
              : 'auth-toggle__button'}
            onClick={() => setView('register')}
          >
            Cadastrar
          </button>
        </div>

        {view === 'login' ? (
          <Login onSuccess={() => navigate('/')} />
        ) : (
          <Register onSuccess={() => setView('login')} />
        )}
      </section>
    </main>
  )
}
