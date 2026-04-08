import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.exchangeCodeForSession().then(({ error }) => {
      navigate(error ? '/login' : '/profile', { replace: true })
    })
  }, [])

  return <p>Signing you in...</p>
}