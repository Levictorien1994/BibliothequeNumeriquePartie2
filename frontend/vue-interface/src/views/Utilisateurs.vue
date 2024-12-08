<template>
  <div>
    <h1>Gestion des Utilisateurs</h1>

    <!-- Formulaire de création ou de modification -->
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="nom">Nom :</label>
        <input id="nom" v-model="form.nom" placeholder="Nom" required />
      </div>
      <div>
        <label for="email">Email :</label>
        <input id="email" v-model="form.email" type="email" placeholder="Email" required />
      </div>
      <div v-if="!isEdit">
        <label for="mot_de_passe">Mot de passe :</label>
        <input
          id="mot_de_passe"
          v-model="form.mot_de_passe"
          type="password"
          placeholder="Mot de passe"
          required
        />
      </div>
      <div>
        <label for="role_id">Rôle :</label>
        <select id="role_id" v-model="form.role_id" required>
          <option value="1">Administrateur</option>
          <option value="2">Auteur</option>
          <option value="3">Lecteur</option>
        </select>
      </div>
      <button type="submit">{{ isEdit ? "Modifier" : "Créer" }}</button>
      <button type="button" @click="resetForm">Annuler</button>
    </form>

    <!-- Liste des utilisateurs -->
    <div v-if="utilisateurs.length">
      <h2>Liste des Utilisateurs</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="utilisateur in utilisateurs" :key="utilisateur.utilisateur_id">
            <td>{{ utilisateur.nom }}</td>
            <td>{{ utilisateur.email }}</td>
            <td>{{ getRoleLabel(utilisateur.role_id) }}</td>
            <td>
              <button @click="editUtilisateur(utilisateur)">Modifier</button>
              <button @click="deleteUtilisateur(utilisateur.utilisateur_id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      utilisateurs: [],
      form: {
        utilisateur_id: null,
        nom: "",
        email: "",
        mot_de_passe: "",
        role_id: "",
      },
      isEdit: false,
    };
  },
  methods: {
    async fetchUtilisateurs() {
      try {
        const response = await axios.get("/api/utilisateurs");
        this.utilisateurs = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    },
    async handleSubmit() {
      try {
        if (this.isEdit) {
          // Mise à jour
          await axios.put(`/api/utilisateurs/${this.form.utilisateur_id}`, this.form);
          alert("Utilisateur mis à jour avec succès !");
        } else {
          // Création
          await axios.post("/api/utilisateurs", this.form);
          alert("Utilisateur créé avec succès !");
        }
        this.resetForm();
        this.fetchUtilisateurs();
      } catch (error) {
        console.error("Erreur lors de l'envoi du formulaire :", error);
        if (error.response && error.response.data.errors) {
          alert(error.response.data.errors.map((e) => e.message).join("\n"));
        }
      }
    },
    async deleteUtilisateur(id) {
      if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
      try {
        await axios.delete(`/api/utilisateurs/${id}`);
        alert("Utilisateur supprimé avec succès !");
        this.fetchUtilisateurs();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
    editUtilisateur(utilisateur) {
      this.isEdit = true;
      this.form = { ...utilisateur };
    },
    resetForm() {
      this.isEdit = false;
      this.form = {
        utilisateur_id: null,
        nom: "",
        email: "",
        mot_de_passe: "",
        role_id: "",
      };
    },
    getRoleLabel(role_id) {
      const roles = {
        1: "Administrateur",
        2: "Auteur",
        3: "Lecteur",
      };
      return roles[role_id] || "Inconnu";
    },
  },
  mounted() {
    this.fetchUtilisateurs();
  },
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

button {
  margin-right: 5px;
}
</style>
