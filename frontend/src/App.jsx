import { useState, useEffect } from 'react'
import { getUsers, createUser, updateUser, deleteUser } from './api/users'
import UserForm from './components/UserForm'
import UserList from './components/UserList'

function App() {
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)
  const [error, setError] = useState('')

  // Charger les utilisateurs au démarrage
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await getUsers()
      setUsers(response.data)
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs')
    }
  }

  const handleSave = async (formData) => {
    try {
      if (userToEdit) {
        await updateUser(userToEdit.id, formData)
      } else {
        await createUser(formData)
      }
      setUserToEdit(null)
      setError('')
      fetchUsers() // Recharger la liste
    } catch (err) {
      setError("Erreur lors de l'enregistrement")
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return
    try {
      await deleteUser(id)
      fetchUsers()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Gestion des utilisateurs</h1>

      {error && (
        <p style={{ color: 'red', background: '#ffe0e0', padding: '8px', borderRadius: '4px' }}>
          {error}
        </p>
      )}

      <UserForm
        userToEdit={userToEdit}
        onSave={handleSave}
        onCancel={() => setUserToEdit(null)}
      />

      <UserList
        users={users}
        onEdit={setUserToEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App