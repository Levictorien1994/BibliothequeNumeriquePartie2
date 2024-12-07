<template>
  <div>
    <h1>Liste des Livres</h1>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="livre in livres" :key="livre.livre_id" class="livre-item">
          <div class="livre-details">
            <img :src="livre.image_url" alt="Couverture du livre" class="livre-image" />
            <div class="livre-info">
              <h2>{{ livre.titre }}</h2>
              <p><strong>Auteur : </strong>{{ livre.Auteur.nom }} {{ livre.Auteur.prenom }} ({{ livre.Auteur.nationalite }})</p>
              <p><strong>Description : </strong>{{ livre.description }}</p>
              <div class="livre-actions">
                <button @click="toggleResume(livre)">
                  {{ livre.showResume ? "Masquer le résumé" : "Afficher le résumé" }}
                </button>
                <button @click="emprunterLivre(livre)" class="emprunter-btn">Emprunter</button>
              </div>
            </div>
          </div>
          <div v-if="livre.showResume" class="livre-resume">
            <p><strong>Résumé :</strong> {{ livre.resume }}</p>
          </div>
        </li>
      </ul>
    </div>
    <button @click="logout" class="logout-btn">Se déconnecter</button>
  </div>
</template>

<script>
import apiClient from '../services/api';

export default {
  data() {
    return {
      livres: [],
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
      this.livres = response.data.map((livre) => ({
        ...livre,
        showResume: false, // Par défaut, le résumé est caché
      }));
    } catch (error) {
      this.error = error.response?.data?.error || 'Erreur lors de la récupération des livres.';
    }
  },
  methods: {
    toggleResume(livre) {
      livre.showResume = !livre.showResume;
    },
    emprunterLivre(livre) {
      apiClient
        .post(`/emprunts`, { livre_id: livre.livre_id }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then(() => alert(`Vous avez emprunté le livre "${livre.titre}".`))
        .catch((error) => {
          console.error(error);
          alert("Erreur lors de la tentative d'emprunt.");
        });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
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

.livre-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.livre-details {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.livre-image {
  width: 350px;
  height: 250px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
}

.livre-info {
  flex: 1;
}

.livre-actions {
  margin-top: 10px;
}

.livre-actions button {
  margin-right: 10px;
}

.livre-resume {
  background-color: #eef5ff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

button {
  padding: 8px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.emprunter-btn {
  background-color: #007bff;
}

.emprunter-btn:hover {
  background-color: #0056b3;
}

.logout-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>
