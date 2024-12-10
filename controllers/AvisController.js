

// Obtenir tous les avis
import Avis from '../models/Avis.js';
import Utilisateur from '../models/Utilisateur.js';

export const getAllAvis = async (req, res) => {
  try {
    const avis = await Avis.findAll({
      include: {
        model: Utilisateur,
        attributes: ['nom'], // Récupère uniquement le nom
      },
    });
    res.status(200).json(avis);
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des avis.' });
  }
};


// Ajouter un avis


export const createAvis = async (req, res) => {
  const { utilisateur_id, note, commentaire } = req.body;

  try {
    if (!utilisateur_id) {
      return res.status(400).json({ error: "L'ID de l'utilisateur est requis." });
    }

    const avis = await Avis.create({ utilisateur_id, note, commentaire });
    res.status(201).json(avis);
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'avis.' });
  }
};