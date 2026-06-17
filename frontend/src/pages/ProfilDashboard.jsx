import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProfilDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Bienvenue, {user?.nom}</h1>
        <button onClick={() => { logout(); navigate('/login') }}
          style={{ padding: '6px 14px', cursor: 'pointer' }}>
          Déconnexion
        </button>
      </div>
      <p>Rôle : Utilisateur</p>
      {user?.image && (
        <img src={user.image} alt="profil"
          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
      )}
    </div>
  )
}

export default ProfilDashboard