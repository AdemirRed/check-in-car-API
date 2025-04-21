import Sequelize, { DataTypes, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid'; // Importação do uuidv4 para gerar UUIDs

class RegistroUso extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID, // Define o tipo como UUID
          defaultValue: uuidv4, // Gera automaticamente um UUID
          primaryKey: true,
        },
        funcionario_id: {
          type: DataTypes.UUID, // Usando DataTypes.UUID
          allowNull: false,
        },
        veiculo_id: {
          type: DataTypes.UUID, // Usando DataTypes.UUID
          allowNull: false,
        },
        finalidade: DataTypes.STRING,  // Usando DataTypes.STRING
        destino: DataTypes.STRING,    // Usando DataTypes.STRING
        data_hora_saida: DataTypes.DATE,  // Usando DataTypes.DATE
        data_hora_retorno: DataTypes.DATE, // Usando DataTypes.DATE
        observacoes: DataTypes.TEXT, // Usando DataTypes.TEXT
        created_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        tableName: 'registros_uso',
        timestamps: true,
      },
    );
  }

  static associate(models) {
    // Relacionamento com o funcionário
    this.belongsTo(models.Funcionario, { foreignKey: 'funcionario_id' });

    // Relacionamento com o veículo
    this.belongsTo(models.Veiculo, { foreignKey: 'veiculo_id' });

    // Relacionamento com as multas
    this.hasMany(models.Multa, { foreignKey: 'registro_uso_id' });
  }
}

export default RegistroUso;
