<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/accueil">Accueil</router-link></li>
        <li><router-link to="/">Login</router-link></li>
        <li><router-link to="/livres">Livres</router-link></li>
        <li><router-link to="/utilisateurs">Utilisateurs</router-link></li>
        <li><router-link to="/categories">Categories</router-link></li>
        <li><router-link to="/auteurs">Auteurs</router-link></li>
        
        
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
}
nav ul li {
  display: inline;
}
</style>
