<template>
    <div>
      <h1>Les Avis des Utilisateurs</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-else>
        <table class="avis-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Note</th>
              <th>Commentaire</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="avis in avis" :key="avis.avis_id">
              <td>{{ avis.Utilisateur?.nom || 'Inconnu' }}</td>
              <td>{{ avis.note }}</td>
              <td>{{ avis.commentaire }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <form @submit.prevent="submitAvis" class="avis-form">
        <textarea
          v-model="newAvis.commentaire"
          placeholder="Laissez votre avis ici..."
          class="avis-textarea"
        ></textarea>
        <select v-model="newAvis.note" class="avis-select">
          <option v-for="n in [1, 2, 3, 4, 5]" :key="n" :value="n">{{ n }}</option>
        </select>
        <button type="submit" class="avis-submit-btn">Ajouter un avis</button>
      </form>
      <button @click="$router.push('/accueil')"  class="btn">Accueil</button>
    </div>
  </template>
  
  
  <script>
  import apiClient from '../services/api';
  
  export default {
    data() {
      return {
        avis: [],
        newAvis: {
          utilisateur_id: localStorage.getItem('user_id'), // Récupère l'utilisateur connecté
          note: null,
          commentaire: '',
        },
        error: '',
      };
    },
    async created() {
      try {
        const response = await apiClient.get('/avis');
        this.avis = response.data;
      } catch (err) {
        this.error = 'Erreur lors de la récupération des avis.';
      }
    },
    methods: {
        async submitAvis() {
  try {
    // Récupérer l'ID de l'utilisateur connecté depuis localStorage
    const userId = localStorage.getItem('user_id'); 
    if (!userId) {
      alert("Utilisateur non identifié. Connectez-vous pour ajouter un avis.");
      return;
    }

    const avisData = {
      utilisateur_id: userId, // Inclure l'ID de l'utilisateur
      note: this.newAvis.note,
      commentaire: this.newAvis.commentaire,
    };

    await apiClient.post('/avis', avisData);
    this.avis.push({ ...avisData, avis_id: Date.now() }); // Ajouter localement l'avis
    this.newAvis.note = null;
    this.newAvis.commentaire = '';
    alert('Avis ajouté avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'avis :', err);
    alert('Erreur lors de l\'ajout de l\'avis.');
  }
},


    },
  };
  </script>
  
<style scoped>
.avis-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .avis-table th,
  .avis-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .avis-table th {
    background-color: #f4f4f4;
  }
  
  .avis-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .avis-textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
    height: 80px;
  }
  
  .avis-select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .avis-submit-btn {
    padding: 10px 15px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .avis-submit-btn:hover {
    background-color: #45a049;
  }
  .btn {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
  

</style>

  