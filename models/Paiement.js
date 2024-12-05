import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Paiement = sequelize.define('Paiement', {
  paiement_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_paiement: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Paiement;
