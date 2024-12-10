<template>
  <div>
    <h1>Gestion des Utilisateurs</h1>

    <!-- Formulaire de création ou de modification -->
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
   
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
          <option value="4"> SuperAdmin</option>
        </select>
      </div>
      <div>
    <label for="photo">Photo :</label>
    <input id="photo" type="file" @change="handlePhotoUpload" />
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
            <th> photo</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="utilisateur in utilisateurs" :key="utilisateur.utilisateur_id">
            <td>
        <img :src="utilisateur.image || './image/vict.jpg'" alt="Photo de l'utlisateur" width="50"  class="user-photo"/>
      </td>
            <td>{{ utilisateur.nom }}</td>
            <td>{{ utilisateur.email }}</td>
            <td>{{ getRoleLabel(utilisateur.role_id) }}</td>
            <td>
              <button @click="editUtilisateur(utilisateur)">Modifier</button>
              <button @click="deleteUtilisateur(utilisateur.utilisateur_id)" class="delete-btn">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="logout" class="logout-btn">Se déconnecter</button>
  </div>
</template>

<script>
import axios from "axios";
import utilisateurService from "../services/utilisateurService";

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
        photo: null,
      },
      isEdit: false,
    };
  },
  async beforeCreate() {
    const userRole = localStorage.getItem("role"); // Récupérer le rôle stocké dans le localStorage
    if (userRole =="SuperAdmin") {
      alert("Vous n'êtes pas autorisé à accéder à cette page.");
      this.$router.push("/"); // Redirige vers la page d'accueil ou une autre page
    }
  },
  
  methods: {
    handlePhotoUpload(event) {
  const file = event.target.files[0];
  this.form.photo = file; // Ajoute le fichier sélectionné au formulaire
},

    async fetchUtilisateurs() {
    try {
      const response = await utilisateurService.getAllUtilisateurs();
      this.utilisateurs = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  },
 
async deleteUtilisateur(id) {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    try {
      await utilisateurService.deleteUtilisateur(id);
      this.fetchUtilisateurs();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }
},
logout() {
  localStorage.removeItem('token'); // Supprime le token d'authentification
  localStorage.removeItem('role');  // Supprime les données de rôle si nécessaire
  this.$router.push('/'); // Redirige vers la page de connexion
},

async handleSubmit() {
  const formData = new FormData();
  Object.keys(this.form).forEach((key) => {
    formData.append(key, this.form[key]);
  });

  try {
    if (this.isEdit) {
      await utilisateurService.updateUtilisateur(this.form.utilisateur_id, formData);
      alert("Utilisateur modifié avec succès !");
    } else {
      await utilisateurService.createUtilisateur(formData);
      alert("Utilisateur créé avec succès !");
    }
    this.resetForm();
    this.fetchUtilisateurs();
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
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
        photo:null,
      };
    },
    getRoleLabel(role_id) {
      const roles = {
        2: "Administrateur",
        6: "Auteur",
        11: "Lecteur",
        7:"SuperAdmin"
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
  background-color:#4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover{background-color:#388e3c}
.delete-btn {
  background-color: #f44336; /* Couleur rouge */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #d32f2f; /* Rouge plus foncé au survol */
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
.logout-btn:hover{ background-color:#d32f2f ;}
</style>
