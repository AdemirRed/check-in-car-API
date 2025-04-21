import Sequelize, { DataTypes, Model } from 'sequelize';

class Multa extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        veiculo_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        registro_uso_id: {
          type: DataTypes.UUID,
          allowNull: true, // Pode ser null se não estiver associado a um registro de uso específico
        },
        usuario_responsavel_id: {
          type: DataTypes.UUID,
          allowNull: true, // Pode ser null se o funcionário responsável não for identificado
        },
        data_multa: DataTypes.DATE,
        descricao: DataTypes.STRING,
        valor: DataTypes.FLOAT,
        paga: DataTypes.BOOLEAN,
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
    this.belongsTo(models.RegistroUso, { foreignKey: 'registro_uso_id', as: 'registroUso' });

    // Relacionamento com o usuário responsável
    this.belongsTo(models.User, {
      foreignKey: 'usuario_responsavel_id', // Atualizado para refletir a mudança
      as: 'usuarioResponsavel',
    });
  }
}

export default Multa;
