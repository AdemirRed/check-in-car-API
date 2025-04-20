import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        nome: Sequelize.STRING,
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        senha_hash: Sequelize.STRING,
        papel: {
          type: Sequelize.ENUM('admin', 'usuario'),
          defaultValue: 'usuario',
        },
        codigo_recuperacao: {
          type: Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'usuarios',
        timestamps: true,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Funcionario, { foreignKey: 'usuario_id' });
  }
}

export default User;
