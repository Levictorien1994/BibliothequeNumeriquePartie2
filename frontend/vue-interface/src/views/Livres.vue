<template>
    <div>
      <h1>Liste des Livres</h1>
      <div v-if="error" style="color: red;">{{ error }}</div>
      <div v-else>
        <ul>
          <li v-for="livre in livres" :key="livre.livre_id">
            <div style="border: 1px solid #ddd; margin: 10px; padding: 10px; border-radius: 5px;">
              <img :src="livre.image_url" alt="Couverture du livre" style="width: 150px; height: 200px; object-fit: cover;">
              <h2>{{ livre.titre }}</h2>
              <p><strong>Auteur : </strong>{{ livre.Auteur.nom }} {{ livre.Auteur.prenom }} ({{ livre.Auteur.nationalite }})</p>
              <p><strong>Description : </strong>{{ livre.description }}</p>
            </div>
          </li>
        </ul>
      </div>
      <button @click="logout">Se déconnecter</button>
    </div>
  </template>
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    data() {
      return {
        livres: [],         //stock les livres
        error: '',
      };
    },
    async created() {
      try {
        const response = await apiClient.get('/livres', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        this.livres = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || 'Erreur lors de la récupération des livres.';
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');      //retour a la page de connexion
      },
    },
  };
  </script>

  <style scoped>
h1 {
  text-align: center;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

img {
  margin-right: 20px;
  border-radius: 4px;
}

div {
  flex: 1;
}
</style>

  





