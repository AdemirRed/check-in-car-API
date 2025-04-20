import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

class Token extends Model {}

Token.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'token',
    tableName: 'tokens',
    underscored: true,
    timestamps: false,
  },
);

export default Token;
