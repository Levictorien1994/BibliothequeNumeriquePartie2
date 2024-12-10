import Utilisateur from '../models/Utilisateur.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path'


// Obtenir tous les utilisateurs
export const getAllUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll();
    res.status(200).json(utilisateurs);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Obtenir un utilisateur par ID
export const getUtilisateurById = async (req, res) => {
  const { id } = req.params;
  try {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
};

// Ajouter un utilisateur

export const createUtilisateur = async (req, res) => {
  const { nom, email, mot_de_passe, role_id } = req.body;
  const imagePath = req.file ? `/image/${req.file.filename}` : null; // Chemin de l'image

  try {
    const utilisateur = await Utilisateur.create({
      nom,
      email,
      mot_de_passe,
      role_id,
      image: imagePath, // Enregistrer le chemin de l'image
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès.', utilisateur });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur.' });
  }
};

// Mettre à jour un utilisateur
export const updateUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    await utilisateur.update(req.body);
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

// Supprimer un utilisateur
export const deleteUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
    await utilisateur.destroy();
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};
//methode pour connexion


export const loginUtilisateur = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    // Récupérer l'utilisateur correspondant à l'email
    const utilisateur = await Utilisateur.findOne({ where: { email } });
    if (!utilisateur) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    // Comparer le mot de passe fourni avec le mot de passe haché
    const isPasswordValid = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: utilisateur.utilisateur_id, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};

export const utilisateurs = await Utilisateur.findAll({
  attributes: ['utilisateur_id', 'nom', 'email', 'role_id', 'image'],
});
