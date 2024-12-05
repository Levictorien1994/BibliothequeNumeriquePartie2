import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});
// Ajouter un interceptor pour inclure le token JWT dans les headers
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Ajouter le token dans le header
    }
    return config;
  });

export default apiClient;
