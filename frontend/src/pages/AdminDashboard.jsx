import { useAuth } from '../context/AuthContext'
import App from '../App' // ton CRUD existant !

function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <div style={{ background: '#5c5ee8', color: 'white', padding: '1rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Bonjour {user?.nom} — Administrateur</span>
        <button onClick={handleLogout}
          style={{ background: 'white', color: '#5c5ee8', border: 'none',
            padding: '6px 14px', borderRadius: '4px', cursor: 'pointer' }}>
          Déconnexion
        </button>
      </div>
      <App /> {/* Le CRUD complet que tu as déjà ! */}
    </div>
  )
}

export default AdminDashboard