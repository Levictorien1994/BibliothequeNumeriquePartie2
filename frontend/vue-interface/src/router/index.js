import { createRouter, createWebHistory } from 'vue-router';
import Livres from '../views/Livres.vue';
import Login from '../views/Login.vue';
import Utilisateurs from '../views/Utilisateurs.vue'
import Accueil from '../views/Home.vue'; 
import Auteurs from '@/views/Auteurs.vue';
import Categories from '../views/Categories.vue';
import Paiement from '../components/icons/Paiement.vue';
import Avis from '../views/Avis.vue';


const routes = [
  { path: '/livres', component: Livres, meta: { requiresAuth: true } },
  { path: '/', name: 'Login', component: Login },
  {path: '/accueil',name: 'Accueil',component: Accueil,},
  { path: '/utilisateurs', name: 'Utilisateurs',component: Utilisateurs,},
 {path: '/auteurs',name:'Auteurs', component:Auteurs},
 {path: '/categories',name:'Categories',component:Categories},
 { path: '/paiement',name: 'Paiement',component: Paiement, },
 { path: '/avis', name: 'Avis',component: Avis,},

 
 
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
