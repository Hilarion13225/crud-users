import { useState, useEffect } from 'react'

function UserForm({ userToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
  })

  // Si on édite un utilisateur, pré-remplir le formulaire
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nom: userToEdit.nom,
        email: userToEdit.email,
        mot_de_passe: '',
      })
    }
  }, [userToEdit])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    setFormData({ nom: '', email: '', mot_de_passe: '' })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>{userToEdit ? 'Modifier' : 'Ajouter'} un utilisateur</h2>

      <div style={{ marginBottom: '0.75rem' }}>
        <input
          name="nom"
          placeholder="Nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={{ padding: '8px', marginRight: '8px', width: '200px' }}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '8px', marginRight: '8px', width: '200px' }}
        />
        <input
          name="mot_de_passe"
          type="password"
          placeholder="Mot de passe"
          value={formData.mot_de_passe}
          onChange={handleChange}
          required={!userToEdit}
          style={{ padding: '8px', marginRight: '8px', width: '200px' }}
        />
      </div>

      <button type="submit" style={{ marginRight: '8px' }}>
        {userToEdit ? '✏️ Modifier' : '➕ Ajouter'}
      </button>
      {userToEdit && (
        <button type="button" onClick={onCancel}>
          Annuler
        </button>
      )}
    </form>
  )
}

export default UserForm