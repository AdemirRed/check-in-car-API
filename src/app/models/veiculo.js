import Sequelize, { Model } from 'sequelize';

class Veiculo extends Model {
  static init(sequelize) {
    super.init(
      {
        placa: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        marca: Sequelize.STRING,
        modelo: Sequelize.STRING,
        cor: Sequelize.STRING,
        renavam: Sequelize.STRING,
        status: Sequelize.STRING, // "disponível", "em uso", "manutenção", etc.
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        tableName: 'veiculos',
        timestamps: true, // Usando campos customizados de data
      },
    );
  }

  static associate(models) {
    // Um veículo pode ter muitos registros de uso
    this.hasMany(models.RegistroUso, { foreignKey: 'veiculo_id' });

    // Um veículo pode ter muitas multas
    this.hasMany(models.Multa, { foreignKey: 'veiculo_id' });
  }
}

export default Veiculo;
