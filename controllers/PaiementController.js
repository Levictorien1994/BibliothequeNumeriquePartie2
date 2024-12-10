import Paiement from '../models/Paiement.js';

// Récupérer tous les paiements
export const getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.findAll();
    res.status(200).json(paiements);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements' });
  }
};

// Récupérer un paiement par ID
export const getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    res.status(200).json(paiement);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du paiement' });
  }
};

// Créer un paiement
export const effectuerPaiement = async (req, res) => {
  const { montant, livre_id } = req.body;
  const utilisateur_id = req.user.id;

  try {
    const paiement = await Paiement.create({
      utilisateur_id,
      montant,
      date_paiement: new Date(),
    });

    res.status(201).json({
      message: "Paiement effectué avec succès.",
      paiement,
    });
  } catch (error) {
    console.error("Erreur lors du paiement :", error);
    res.status(500).json({ error: "Erreur lors du paiement." });
  }
};
// Mettre à jour un paiement
export const updatePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    await paiement.update(req.body);
    res.status(200).json(paiement);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du paiement' });
  }
};

// Supprimer un paiement
export const deletePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByPk(req.params.id);
    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    await paiement.destroy();
    res.status(200).json({ message: 'Paiement supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du paiement' });
  }
};
