<template>
    <div>
      <h1>Liste des Livres</h1>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <ul v-else>
        <li v-for="livre in livres" :key="livre.id">
          {{ livre.titre }} - Auteur : {{ livre.auteur_id }}
        </li>
      </ul>
      <button @click="logout">Se déconnecter</button>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api.js';
  
  export default {
    data() {
      return {
        livres: [], // Stockera la liste des livres
        error: '',  // Message d'erreur s'il y en a
      };
    },
    async created() {
      try {
        // Appel à l'API pour récupérer les livres
        const response = await apiClient.get('/livres');
        this.livres = response.data;
      } catch (error) {
        // Gestion des erreurs
        this.error = error.response?.data?.error || 'Erreur lors de la récupération des livres.';
      }
    },
    methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login'); // Redirection vers la page de connexion
    },
  },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
    font-weight: bold;
  }
  </style>
  





