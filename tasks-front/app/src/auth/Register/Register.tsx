import { useState } from 'react'
import { AuthAPI } from '../../api/auth.api'

type Props = {
  onSuccess?: () => void
}

export function Register({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    const payload = Object.fromEntries(new FormData(e.currentTarget)) as any

    try {
      const res = await AuthAPI.register(payload)
      setFeedback(res.message)
      onSuccess?.()
      e.currentTarget.reset()
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-field">
        <span>Nome completo</span>
        <input name="name" required />
      </label>

      <label className="auth-field">
        <span>Email</span>
        <input name="email" type="email" required />
      </label>

      <label className="auth-field">
        <span>Senha</span>
        <input name="password" type="password" required />
      </label>

      <label className="auth-field">
        <span>Confirmar senha</span>
        <input name="password_confirmation" type="password" required />
      </label>

      <button className="auth-submit" disabled={loading}>
        {loading ? 'Cadastrando...' : 'Cadastrar'}
      </button>

      {feedback && <output className="auth-feedback auth-feedback--success">{feedback}</output>}
    </form>
  )
}
