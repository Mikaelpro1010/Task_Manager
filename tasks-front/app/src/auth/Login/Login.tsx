import { useState } from 'react'
import { useAuth } from '../AuthContext'

type Props = {
  onSuccess?: () => void
}

export function Login({ onSuccess }: Props) {
  const { login } = useAuth()

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<
    { message: string; tone: 'success' | 'error' } | null
  >(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setFeedback(null)

    const formData = new FormData(event.currentTarget)

    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')

    try {
      await login({ email, password })

      setFeedback({
        message: 'Login realizado com sucesso!',
        tone: 'success',
      })

      onSuccess?.()
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao realizar login'

      setFeedback({
        message,
        tone: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <label className="auth-field">
        <span>Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </label>

      <label className="auth-field">
        <span>Senha</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>

      <button
        type="submit"
        className="auth-submit"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      {feedback && (
        <output
          role="status"
          aria-live="polite"
          className={`auth-feedback ${
            feedback.tone === 'success'
              ? 'auth-feedback--success'
              : 'auth-feedback--error'
          }`}
        >
          {feedback.message}
        </output>
      )}
    </form>
  )
}
