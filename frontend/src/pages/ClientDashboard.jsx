import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ClientDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Bienvenue, {user?.nom}</h1>
        <button onClick={() => { logout(); navigate('/login') }}>Déconnexion</button>
      </div>
      <p>Rôle : Client</p>
      {user?.image && <img src={user.image} alt="profil"
        style={{ width: '80px', height: '80px', borderRadius: '50%' }} />}
    </div>
  )
}

export default ClientDashboard