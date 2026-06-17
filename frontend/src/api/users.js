import axios from 'axios'

// const API = axios.create({
//   baseURL: 'http://localhost:8000/api',
// })
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})

// Récupérer tous les utilisateurs
export const getUsers = () => API.get('/users/')

// Créer un utilisateur
// export const createUser = (data) => API.post('/users/', data)

// Créer un utilisateur (avec image)
export const createUser = (data) => API.post('/users/', data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

// Modifier un utilisateur
// export const updateUser = (id, data) => API.put(`/users/${id}/`, data)

// Modifier un utilisateur (avec image)
export const updateUser = (id, data) => API.put(`/users/${id}/`, data, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

// Supprimer un utilisateur
export const deleteUser = (id) => API.delete(`/users/${id}/`)