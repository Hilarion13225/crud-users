import { useState, useEffect } from 'react'

function UserForm({ userToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [imageMode, setImageMode] = useState('file') // 'file' ou 'url'
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (userToEdit) {
      setFormData({ nom: userToEdit.nom, email: userToEdit.email, mot_de_passe: '' })
      setPreview(userToEdit.image || null)
    }
  }, [userToEdit])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // On utilise FormData pour envoyer fichiers + texte ensemble
    const data = new FormData()
    data.append('nom', formData.nom)
    data.append('email', formData.email)
    if (formData.mot_de_passe) data.append('mot_de_passe', formData.mot_de_passe)

    if (imageMode === 'file' && imageFile) {
      data.append('image', imageFile)
    } else if (imageMode === 'url' && imageUrl) {
      data.append('image', imageUrl)
    }

    onSave(data)
    setFormData({ nom: '', email: '', mot_de_passe: '' })
    setImageFile(null)
    setImageUrl('')
    setPreview(null)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>{userToEdit ? 'Modifier' : 'Ajouter'} un utilisateur</h2>

      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input name="nom" placeholder="Nom" value={formData.nom}
          onChange={handleChange} required style={{ padding: '8px', width: '180px' }} />
        <input name="email" type="email" placeholder="Email" value={formData.email}
          onChange={handleChange} required style={{ padding: '8px', width: '200px' }} />
        <input name="mot_de_passe" type="password" placeholder="Mot de passe"
          value={formData.mot_de_passe} onChange={handleChange}
          required={!userToEdit} style={{ padding: '8px', width: '180px' }} />
      </div>

      {/* Choix du mode image */}
      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '16px' }}>
        <label>
          <input type="radio" value="file" checked={imageMode === 'file'}
            onChange={() => setImageMode('file')} /> Fichier
        </label>
        <label>
          <input type="radio" value="url" checked={imageMode === 'url'}
            onChange={() => setImageMode('url')} /> URL
        </label>
      </div>

      {imageMode === 'file' ? (
        <input type="file" accept="image/*" onChange={handleFileChange}
          style={{ marginBottom: '0.75rem' }} />
      ) : (
        <input type="url" placeholder="https://exemple.com/photo.jpg"
          value={imageUrl} onChange={(e) => {
            setImageUrl(e.target.value)
            setPreview(e.target.value)
          }}
          style={{ padding: '8px', width: '360px', marginBottom: '0.75rem' }} />
      )}

      {/* Prévisualisation */}
      {preview && (
        <div style={{ marginBottom: '0.75rem' }}>
          <img src={preview} alt="preview"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }} />
        </div>
      )}

      <div>
        <button type="submit" style={{ marginRight: '8px' }}>
          {userToEdit ? '✏️ Modifier' : '➕ Ajouter'}
        </button>
        {userToEdit && <button type="button" onClick={onCancel}>Annuler</button>}
      </div>
    </form>
  )
}

export default UserForm