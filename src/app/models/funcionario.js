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
        // Remova os campos `created_at` e `updated_at` do modelo, pois o Sequelize já os gerencia automaticamente
      },
      {
        sequelize,
        tableName: 'funcionarios', // Certifique-se de que o nome da tabela está correto
        timestamps: true, // Garante que o Sequelize gerencie `createdAt` e `updatedAt`
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
