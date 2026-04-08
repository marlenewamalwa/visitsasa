import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
  supabase.auth.exchangeCodeForSession().then(({ error }) => {
    if (error) {
      navigate('/login', { replace: true })
    } else {
      setTimeout(() => {
        navigate('/profile', { replace: true })
      }, 500)
    }
  })
}, [])

  return <p>Signing you in...</p>
}