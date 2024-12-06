import { createRouter, createWebHistory } from 'vue-router';
import Livres from '../views/Livres.vue';
import Login from '../views/Login.vue';
import Utilisateurs from '../views/Utilisateurs.vue'
import Accueil from '../views/Home.vue'; 
const routes = [
  { path: '/livres', component: Livres, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  {path: '/',
    name: 'Accueil',
    component: Accueil,
},
{
  path: '/utilisateurs',
  name: 'Utilisateurs',
  component: Utilisateurs,
}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Redirection pour les routes nécessitant une authentification
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login'); // Redirige vers la page de connexion si pas de token
  } else {
    next();
  }
});

export default router;
