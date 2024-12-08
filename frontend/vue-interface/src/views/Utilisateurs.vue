<template>
  <div class="utilisateurs-page">
    <h1>Gestion des utilisateurs</h1>

    <!-- Barre de recherche -->
    <div class="search-bar">
      <input
        v-model="searchName"
        placeholder="Rechercher par nom"
        @input="fetchUtilisateurs"
      />
      <select v-model="searchRole" @change="fetchUtilisateurs">
        <option value="">Tous les rôles</option>
        <option v-for="role in roles" :key="role.role_id" :value="role.role_id">
          {{ role.nom }}
        </option>
      </select>
    </div>

    <!-- Liste des utilisateurs -->
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="utilisateur in utilisateurs" :key="utilisateur.utilisateur_id">
          <td>
            <img
              :src="utilisateur.photo || '/images/default-avatar.png'"
              alt="Photo de l'utilisateur"
              class="user-photo"
            />
          </td>
          <td>{{ utilisateur.nom }}</td>
          <td>{{ utilisateur.email }}</td>
          <td>{{ utilisateur.Role.nom }}</td>
          <td>
            <button @click="supprimerUtilisateur(utilisateur.utilisateur_id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulaire d'ajout -->
    <div class="form-section">
      <h2>Ajouter un utilisateur</h2>
      <form @submit.prevent="enregistrerUtilisateur">
        <input v-model="nouvelUtilisateur.nom" type="text" placeholder="Nom" required />
        <input v-model="nouvelUtilisateur.email" type="email" placeholder="Email" required />
        <input v-model="nouvelUtilisateur.mot_de_passe" type="password" placeholder="Mot de passe" required />
        <select v-model="nouvelUtilisateur.role_id" required>
          <option value="">Sélectionnez un rôle</option>
          <option v-for="role in roles" :key="role.role_id" :value="role.role_id">
            {{ role.nom }}
          </option>
        </select>
        <input type="file" @change="handlePhotoUpload" />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  </div>
</template>
<script>
import apiClient from "../services/api";

export default {
  data() {
    return {
      utilisateurs: [],
      roles: [],
      searchName: "",
      searchRole: "",
      nouvelUtilisateur: {
        nom: "",
        email: "",
        mot_de_passe: "",
        role_id: "",
        photo: null,
      },
    };
  },
  async created() {
    await this.fetchRoles();
    await this.fetchUtilisateurs();
  },
  methods: {
    async fetchUtilisateurs() {
      try {
        const response = await apiClient.get("/utilisateurs", {
          params: {
            nom: this.searchName,
            role: this.searchRole,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.utilisateurs = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    },
    async fetchRoles() {
      try {
        const response = await apiClient.get("/roles", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.roles = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error);
      }
    },
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      this.nouvelUtilisateur.photo = file;
    },
    async enregistrerUtilisateur() {
      const formData = new FormData();
      formData.append("nom", this.nouvelUtilisateur.nom);
      formData.append("email", this.nouvelUtilisateur.email);
      formData.append("mot_de_passe", this.nouvelUtilisateur.mot_de_passe);
      formData.append("role_id", this.nouvelUtilisateur.role_id);
      if (this.nouvelUtilisateur.photo) {
        formData.append("photo", this.nouvelUtilisateur.photo);
      }

      try {
        await apiClient.post("/utilisateurs", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Utilisateur ajouté avec succès.");
        await this.fetchUtilisateurs();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      }
    },
    async supprimerUtilisateur(utilisateurId) {
      try {
        await apiClient.delete(`/utilisateurs/${utilisateurId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.utilisateurs = this.utilisateurs.filter(
          (u) => u.utilisateur_id !== utilisateurId
        );
        alert("Utilisateur supprimé.");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
  },
};
</script>
.utilisateurs-page {
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.user-photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

form input,
form select,
form button {
  display: block;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  max-width: 300px;
}
