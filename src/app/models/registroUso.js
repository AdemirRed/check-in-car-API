import Sequelize, { Model } from 'sequelize';

class RegistroUso extends Model {
  static init(sequelize) {
    super.init(
      {
        funcionario_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        veiculo_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        finalidade: Sequelize.STRING,
        destino: Sequelize.STRING,
        data_hora_saida: Sequelize.DATE,
        data_hora_retorno: Sequelize.DATE,
        observacoes: Sequelize.TEXT,
        criado_em: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        atualizado_em: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        tableName: 'registros_uso',
        timestamps: false,
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
