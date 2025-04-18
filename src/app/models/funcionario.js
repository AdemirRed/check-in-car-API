import Sequelize, { Model } from 'sequelize';

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        usuario_id: {
          type: Sequelize.UUID,
          allowNull: false,
        },
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.STRING,
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
        tableName: 'funcionarios',
        timestamps: false,
      },
    );
  }

  static associate(models) {
    // Relacionamento com o usuário
    this.belongsTo(models.User, { foreignKey: 'usuario_id' });

    // Relacionamento com os registros de uso
    this.hasMany(models.RegistroUso, { foreignKey: 'funcionario_id' });

    // Relacionamento com as multas
    this.hasMany(models.Multa, { foreignKey: 'funcionario_responsavel_id' });
  }
}

export default Funcionario;
