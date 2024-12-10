import multer from 'multer';
import path from 'path';

// Configuration de stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/image')); // Dossier cible
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique
  },
});

// Création de l'instance multer
const upload = multer({ storage });

// Exporter l'instance multer
export default upload;
