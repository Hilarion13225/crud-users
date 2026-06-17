import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// Récupérer tous les utilisateurs
export const getUsers = () => API.get('/users/')

// Créer un utilisateur
export const createUser = (data) => API.post('/users/', data)

// Modifier un utilisateur
export const updateUser = (id, data) => API.put(`/users/${id}/`, data)

// Supprimer un utilisateur
export const deleteUser = (id) => API.delete(`/users/${id}/`)