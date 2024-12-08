// src/services/UtilisateurService.js

import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Remplacez par l'URL de votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  // Récupérer tous les utilisateurs
  getAllUtilisateurs() {
    return apiClient.get("/utilisateurs");
  },

  // Récupérer un utilisateur par ID
  getUtilisateurById(id) {
    return apiClient.get(`/utilisateurs/${id}`);
  },

  // Créer un utilisateur
  createUtilisateur(utilisateur) {
    return apiClient.post("/utilisateurs", utilisateur);
  },

  // Mettre à jour un utilisateur
  updateUtilisateur(id, utilisateur) {
    return apiClient.put(`/utilisateurs/${id}`, utilisateur);
  },

  // Supprimer un utilisateur
  deleteUtilisateur(id) {
    return apiClient.delete(`/utilisateurs/${id}`);
  },
};
