import apiClient from "./api"; // Assurez-vous que `api.js` est correctement importé

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
