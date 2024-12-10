<template>
    <div class="paiement-page">
      <h1>Paiement</h1>
      <p>Vous êtes sur le point de payer pour le livre : <strong>{{ titre }}</strong></p>
      <p>Identifiant du livre : {{ livre_id }}</p>
  
      <div class="payment-options">
        <h2>Choisissez votre méthode de paiement :</h2>
        <div class="payment-methods">
          <div class="method">
            <img src="https://tse1.mm.bing.net/th?id=OIP.oE19CHhiC5hm0zovsgV6wQHaFw&pid=Api&P=0&h=180" alt="Carte Bancaire" class="payment-icon" />
            <button>Carte Bancaire</button>
          </div>
          <div class="method">
            <img src="https://tse4.mm.bing.net/th?id=OIP.qSHdIwPpOu02qOTG1PXSgwHaFY&pid=Api&P=0&h=180" alt="PayPal" class="payment-icon" />
            <button>PayPal</button>
          </div>
          <div class="method">
            <img src="https://tse4.mm.bing.net/th?id=OIP.6AHNWYqPdYSr8J37tn47ewHaE8&pid=Api&P=0&h=180" alt="Mobile Payment" class="payment-icon" />
            <button>Paiement Mobile</button>
          </div>
        </div>
      </div>
  
      <button @click="retourner" class="return-btn">Retour à la liste des livres</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        livre_id: this.$route.query.livre_id, // Récupère l'ID du livre passé en query
        titre: this.$route.query.titre,      // Récupère le titre du livre passé en query
      };
    },
    methods: {
      retourner() {
        this.$router.push('/livres'); // Redirige vers la page des livres
      },
    },
  };
  </script>
  
  <style scoped>
  .paiement-page {
    text-align: center;
    margin-top: 50px;
  }
  
  .payment-options {
    margin-top: 20px;
  }
  
  .payment-methods {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .method {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .payment-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #388e3c;
  }
  
  .return-btn {
    margin-top: 30px;
    padding: 10px 20px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .return-btn:hover {
    background-color: #d32f2f;
  }
  </style>
  