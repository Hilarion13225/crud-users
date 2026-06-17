import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function Login() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_URL}/login/`, {
        email,
        mot_de_passe: motDePasse,
      })
      login(res.data.user, res.data.access)

      // Redirection selon le rôle
      const role = res.data.user.role
      if (role === 'admin') navigate('/admin')
      else if (role === 'client') navigate('/client')
      else navigate('/profil')

    } catch (err) {
      setError('Email ou mot de passe incorrect')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Connexion</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input type="password" placeholder="Mot de passe" value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)} required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#5c5ee8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Pas encore de compte ? <Link to="/register">S'inscrire</Link>
      </p>
    </div>
  )
}

export default Login