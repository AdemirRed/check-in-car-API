import Sequelize, { Model } from 'sequelize';

class Veiculo extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4, // Garante que o UUID seja gerado automaticamente
          primaryKey: true,
        },
        placa: {
          type: Sequelize.STRING,
          unique: true, // Garante que a placa seja única
          allowNull: false,
        },
        marca: Sequelize.STRING,
        modelo: Sequelize.STRING,
        cor: Sequelize.STRING,
        renavam: Sequelize.STRING,
        status: {
          type: Sequelize.ENUM('ativo', 'inativo', 'em manutenção'), // Adicionado 'disponível'
          defaultValue: 'ativo', // Define um status padrão
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
