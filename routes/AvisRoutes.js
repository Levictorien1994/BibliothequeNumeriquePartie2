// routes/avisRoutes.js
import express from 'express';
import { getAllAvis, createAvis } from '../controllers/AvisController.js';

const router = express.Router();

// Route pour obtenir tous les avis
router.get('/', getAllAvis);

// Route pour ajouter un avis
router.post('/', createAvis);

export default router;
