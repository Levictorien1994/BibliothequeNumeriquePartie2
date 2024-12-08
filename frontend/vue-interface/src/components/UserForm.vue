<template>
    <div>
      <h2>{{ user.id ? "Modifier Utilisateur" : "Ajouter Utilisateur" }}</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="nom">Nom:</label>
          <input v-model="user.nom" id="nom" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="user.email" id="email" type="email" required />
        </div>
        <div>
          <label for="password" v-if="!user.id">Mot de passe:</label>
          <input v-model="user.password" id="password" type="password" v-if="!user.id" required />
        </div>
        <button type="submit">Enregistrer</button>
        <button type="button" @click="$emit('close')">Annuler</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, watch } from "vue";
  
  export default {
    props: {
      user: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props, { emit }) {
      const user = ref({ ...props.user });
  
      watch(
        () => props.user,
        (newUser) => {
          Object.assign(user.value, newUser);
        }
      );
  
      const handleSubmit = () => {
        emit("save", user.value);
      };
  
      return { user, handleSubmit };
    },
  };
  </script>
  