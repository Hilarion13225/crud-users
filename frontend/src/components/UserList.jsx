function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p>Aucun utilisateur pour le moment.</p>
  }

  return (
    <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ background: '#f0f0f0' }}>
          <th>ID</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Photo</th>
          <th>Créé le</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nom}</td>
            <td>{user.email}</td>
            <td style={{ textAlign: 'center' }}>
                {user.image ? (
                    <img
                    src={user.image}
                    alt=""
                    onError={(e) => { e.target.style.display = 'none' }}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto'
                    }}
                    />
                ) : (
                    <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#ddd', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '18px', margin: '0 auto'
                    }}>
                    👤
                    </div>
                )}
            </td>
            <td>{new Date(user.cree_le).toLocaleDateString('fr-FR')}</td>
            <td>
              <button onClick={() => onEdit(user)} style={{ marginRight: '8px' }}>
                ✏️ Modifier
              </button>
              <button onClick={() => onDelete(user.id)} style={{ color: 'red' }}>
                🗑️ Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UserList