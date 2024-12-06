import Emprunt from '../models/Emprunt.js';

// Récupérer tous les emprunts
export const listerEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.findAll({
      include: ['Utilisateur', 'Livre'], // Inclure les relations
    });
    res.status(200).json(emprunts);
  } catch (error) {
    console.error('Erreur lors de la récupération des emprunts :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des emprunts.' });
  }
};


// Récupérer un emprunt par ID
export const getEmpruntById = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByPk(req.params.id);
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    res.status(200).json(emprunt);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'emprunt' });
  }
};

// Créer un emprunt
export const createEmprunt = async (req, res) => {
  const { livre_id } = req.body;
  const utilisateur_id = req.user.id; // Assurez-vous que l'ID de l'utilisateur connecté est extrait du token JWT

  try {
    const emprunt = await Emprunt.create({
      livre_id,
      utilisateur_id,
      date_emprunt: new Date(),
    });
    res.status(201).json({ message: 'Livre emprunté avec succès', emprunt });
  } catch (error) {
    console.error('Erreur lors de la création de l\'emprunt :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'emprunt.' });
  }
};



// Mettre à jour un emprunt
export const updateEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByPk(req.params.id);
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    await emprunt.update(req.body);
    res.status(200).json(emprunt);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'emprunt' });
  }
};

// Supprimer un emprunt
export const deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByPk(req.params.id);
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    await emprunt.destroy();
    res.status(200).json({ message: 'Emprunt supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'emprunt' });
  }
};
export const rendreLivre = async (req, res) => {
  const { emprunt_id } = req.params;

  try {
    const emprunt = await Emprunt.findByPk(emprunt_id);

    if (!emprunt || emprunt.date_retour) {
      return res.status(404).json({ error: 'Emprunt introuvable ou déjà rendu.' });
    }

    emprunt.date_retour = new Date();
    await emprunt.save();

    res.status(200).json({ message: 'Livre rendu avec succès.', emprunt });
  } catch (error) {
    console.error('Erreur lors de la restitution :', error);
    res.status(500).json({ error: 'Erreur lors de la restitution.' });
  }
};
