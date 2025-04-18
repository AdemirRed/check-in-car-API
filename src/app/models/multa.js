import Sequelize, { Model } from 'sequelize';

class Multa extends Model {
  static init(sequelize) {
    super.init(
      {
        veiculo_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        registro_uso_id: {
          type: Sequelize.UUID,
          allowNull: true, // Pode ser null se não estiver associado a um registro de uso específico
        },
        funcionario_responsavel_id: {
          type: Sequelize.UUID,
          allowNull: true, // Pode ser null se o funcionário responsável não for identificado
        },
        data_multa: Sequelize.DATE,
        descricao: Sequelize.STRING,
        valor: Sequelize.DECIMAL,
        paga: Sequelize.BOOLEAN,
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
        tableName: 'multas',
        timestamps: true,
      },
    );
  }

  static associate(models) {
    // Relacionamento com o veículo
    this.belongsTo(models.Veiculo, { foreignKey: 'veiculo_id' });

    // Relacionamento com o registro de uso
    this.belongsTo(models.RegistroUso, { foreignKey: 'registro_uso_id' });

    // Relacionamento com o funcionário responsável
    this.belongsTo(models.Funcionario, {
      foreignKey: 'funcionario_responsavel_id',
    });
  }
}

export default Multa;
