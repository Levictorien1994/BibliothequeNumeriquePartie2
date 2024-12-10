<template>
  <div class="form-container">
    <!-- Image en haut -->
    <img src="https://cdn.pixabay.com/photo/2015/10/10/13/03/prague-980732_640.jpg" alt="Bibliothèque numérique" class="banner-image" />

    <!-- Texte et formulaire en dessous -->
    <h1>Connexion</h1>
    <h2>Accédez à un monde de savoirs</h2>
    <p>Connectez-vous pour explorer, lire et enrichir votre esprit grâce à notre bibliothèque numérique.</p>

    <form @submit.prevent="login">
      <div class="form-group">
        <label>Email :</label>
        <input type="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label>Mot de passe :</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" class="login-btn">Se connecter</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <p class="signup-prompt">
      Pas encore membre ? <router-link to="/inscription">Inscrivez-vous ici</router-link>
    </p>
  </div>
</template>

<script>
import apiClient from '../services/api';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await apiClient.post('/utilisateurs/login', {
          email: this.email,
          mot_de_passe: this.password,
        });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/accueil'); // Redirection après connexion
      } catch (error) {
        this.error = error.response?.data?.error || 'Erreur lors de la connexion.';
      }
    },
  },
};
</script>

<style scoped>

.form-container {
  max-width: 500px; /* Limite la largeur */
  width: 400%; /* S'adapte à l'écran */
  margin: 0 auto; /* Centre horizontalement */
  padding: 20px;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

/* Image en haut */
.banner-image {
  width: 100%; 
  height: auto; 
  border-radius: 8px;
  margin-bottom: 20px;
}

/* Titres et texte */
h1, h2 {
  margin: 10px 0;
  color: #333;
}

p {
  color: #555;
  line-height: 1.5;
  font-size: 1em;
}

/* Champs du formulaire */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="email"], input[type="password"] {
  width: 100%; /* Remplit tout l'espace disponible */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Gère les marges internes */
}

/* Bouton de connexion */
.login-btn {
  margin-top: 15px;
  padding: 12px 25px;
  background: linear-gradient(to right, #4caf50, #81c784);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-btn:hover {
  background: #388e3c;
}

/* Message d'erreur */
.error {
  color: red;
  margin-top: 10px;
}

/* Texte pour l'inscription */
.signup-prompt {
  margin-top: 20px;
  color: #333;
}

.signup-prompt a {
  color: #4caf50;
  font-weight: bold;
}
</style>
