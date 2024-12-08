import axios from "axios";

// Configuration de l'instance axios
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Remplacez par l'URL de votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un interceptor pour inclure le token JWT dans les headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupérer le token depuis localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans le header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajouter un interceptor pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  (response) => {
    return response; // Retourner la réponse si tout est OK
  },
  (error) => {
    if (error.response) {
      // Si le serveur a répondu avec un code d'erreur (4xx ou 5xx)
      console.error("Erreur API :", error.response.data);
      if (error.response.status === 401) {
        // Si l'utilisateur n'est pas authentifié
        alert("Votre session a expiré. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirection vers la page de connexion
      } else if (error.response.status === 403) {
        // Si l'utilisateur n'a pas les droits nécessaires
        alert("Vous n'avez pas les autorisations nécessaires pour cette action.");
      } else {
        alert(`Erreur : ${error.response.data.error || "Une erreur s'est produite."}`);
      }
    } else if (error.request) {
      // Si aucune réponse n'a été reçue du serveur
      console.error("Erreur de réseau :", error.request);
      alert("Impossible de se connecter au serveur. Vérifiez votre connexion.");
    } else {
      // Si une erreur s'est produite lors de la configuration de la requête
      console.error("Erreur inconnue :", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
