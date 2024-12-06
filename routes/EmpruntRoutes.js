import express from 'express';
import { authenticateToken, authorizeRole } from '../middlewares/authMiddleware.js';
import { validateEmprunt } from '../middlewares/validationMiddleware.js';
import {

  getEmpruntById,
  createEmprunt,
  updateEmprunt,
  deleteEmprunt,
  listerEmprunts,
  rendreLivre,
} from '../controllers/EmpruntController.js';

const router = express.Router();

// Routes
// Route pour créer un emprunt
router.post('/', authenticateToken, createEmprunt);
router.get('/:id', authenticateToken, getEmpruntById); // Obtenir un emprunt par ID
router.post('/emprunts', authenticateToken, createEmprunt);

router.put('/:id', validateEmprunt, authenticateToken, updateEmprunt); // Mettre à jour un emprunt
router.delete('/:id', authenticateToken, authorizeRole(['SuperAdmin', 'Administrateur']), deleteEmprunt); // Supprimer un emprunt
// Route pour récupérer tous les emprunts
router.get('/', authenticateToken, listerEmprunts);
//rendre un livre
router.put('/:emprunt_id/rendre', authenticateToken, rendreLivre);
export default router;
