<template>
  <div class="home-page">
    <!-- Section principale avec une bannière -->
    <div class="hero-section">
      <h1>Bienvenue sur la bibliothèque numérique</h1>
      <p>Un voyage à travers l'histoire et l'avenir de la lecture.</p>
      <img 
        src="https://img.freepik.com/premium-photo/old-photo-album-with-photos-beautiful-wooden-table-old-cameras-mockup-free_165541-97.jpg?ga=GA1.1.1037045363.1729958757&semt=ais_hybrid" 
        alt="Bibliothèque numérique" 
        class="hero-image"
      />
    </div>

    <!-- Section sur la naissance des bibliothèques -->
    <div class="history-section">
      <h2>L'histoire fascinante des bibliothèques</h2>
      <p>
        Les bibliothèques existent depuis des milliers d'années. Les premières étaient des collections d'archives en Mésopotamie, où les tablettes d'argile conservaient les écrits des premières civilisations. Aujourd'hui, les bibliothèques ont évolué pour devenir des centres numériques, offrant un accès à une richesse infinie de connaissances et de divertissements.
      </p>
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoZrWncDnczmtyiRBjSeqAvu28fFSgyMitOEJ7fgE1b-jdfEKKoKlkLCqQD3JFgi9HzDc&usqp=CAU" 
        alt="imae dune ancienne bibliotheque"
      />
      <!-- Ajout d'une vidéo YouTube -->
      <div class="video-container">
        <iframe 
          width="560" 
          height="315" 
          src="https://cdn.pixabay.com/video/2021/08/05/84005-584870917_tiny.mp4" 
          title="Histoire des bibliothèques"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <router-link to="/" class="con">se connecter</router-link>

    <!-- Section des fonctionnalités -->
    <div class="features">
      
      <div class="feature-item">
        <h2>📚 Explorez nos livres</h2>
        <p>Parcourez une vaste collection de livres numériques et découvrez de nouvelles lectures passionnantes.</p>
        <router-link to="/livres" class="btn">Voir les livres</router-link>
      </div>

      <div class="feature-item">
        <h2>👤 Gérez les utilisateurs</h2>
        <p>Ajoutez, modifiez et consultez les informations des utilisateurs de la bibliothèque.</p>
        <router-link to="/utilisateurs" class="btn">Gérer les utilisateurs</router-link>
      </div>
      <div class="feature-item">
        <h2> 🧝‍♂️ liste des auteurs</h2>
        <p>vous aller retrouver ici le liste de nos auteur et leur champ daction</p>
        <router-link to="/auteurs" class="btn">liste des auteurs</router-link>
        
      </div>
    </div>
         <button @click="$router.push('/avis')"  class="btn">Voir les Avis</button>
  </div>
</template>

<style scoped>
.home-page {
  padding: 20px;
  background-color: #f9f9f9;
}

.hero-section {
  text-align: center;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #333;
}

.hero-section p {
  font-size: 1.2rem;
  color: #666;
}

.hero-image {
  margin-top: 20px;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.history-section {
  text-align: center;
  margin: 40px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.history-section h2 {
  color: #007bff;
  margin-bottom: 20px;
}

.history-section p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

.history-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

.history-video {
  max-width: 100%;
  border-radius: 8px;
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 40px;
}

.feature-item {
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: center;
}

.feature-item h2 {
  color: #007bff;
}

.feature-item p {
  font-size: 1rem;
  color: #333;
}
.con{display: block;

  margin:10px auto;
  padding: 10px 50px;
  max-width: 190px; 
  min-width: 100px;
  background-color: #4caf50;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;

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

.btn:hover {
  background-color: #0056b3;
}
</style>
