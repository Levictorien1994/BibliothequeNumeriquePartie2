import express from 'express';
import { validateUtilisateur, validateLoginUtilisateur } from '../middlewares/validationMiddleware.js';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js'
import {
  getAllUtilisateurs,
  getUtilisateurById,
  createUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  loginUtilisateur
} from '../controllers/UtilisateurController.js';

const router = express.Router();

// Routes
router.get('/',authenticateToken,  getAllUtilisateurs); // Obtenir tous les utilisateurs
router.get('/:id', authenticateToken, getUtilisateurById); // Obtenir un utilisateur par ID
router.put('/:id', authenticateToken,authorizeRole(['SuperAdmin','Administrateur']),  updateUtilisateur); // Mettre à jour un utilisateur
router.delete('/:id',authenticateToken,  deleteUtilisateur); // Supprimer un utilisateur
router.post('/',  validateUtilisateur, createUtilisateur);
router.post('/login', validateLoginUtilisateur, loginUtilisateur);

export default router;
