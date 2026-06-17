import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function Register() {
  const [form, setForm] = useState({ nom: '', email: '', mot_de_passe: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_URL}/register/`, form)
      login(res.data.user, res.data.access)
      navigate('/profil') // les nouveaux comptes sont "utilisateur" par défaut
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription")
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Créer un compte</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input name="nom" placeholder="Nom complet" value={form.nom}
            onChange={handleChange} required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input name="email" type="email" placeholder="Email" value={form.email}
            onChange={handleChange} required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input name="mot_de_passe" type="password" placeholder="Mot de passe" value={form.mot_de_passe}
            onChange={handleChange} required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px',
          background: '#5c5ee8', color: 'white', border: 'none',
          borderRadius: '6px', cursor: 'pointer' }}>
          S'inscrire
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  )
}

export default Register