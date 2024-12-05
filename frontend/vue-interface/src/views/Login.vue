<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <div>
          <label>Email :</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
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
          this.$router.push('/livres'); // Redirection après connexion
        } catch (error) {
          this.error = error.response?.data?.error || 'Erreur lors de la connexion.';
        }
      },
    },
  };
  </script>
  