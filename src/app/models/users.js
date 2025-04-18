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
          unique: true, // Garantir que o email seja único
          allowNull: false,
        },
        senha_hash: Sequelize.STRING,
        papel: {
          type: Sequelize.ENUM('admin', 'usuario'),
          defaultValue: 'usuario',
        },
        
      },
      {
        sequelize,
        tableName: 'usuarios', // Definir o nome da tabela explicitamente
        timestamps: true, // Desabilitar timestamps automáticos, pois você tem campos personalizados
      },
    );
  }

  static associate(models) {
    // Associar User a Funcionario, com a chave estrangeira 'usuario_id' na tabela Funcionario
    this.hasMany(models.Funcionario, { foreignKey: 'usuario_id' });
  }
}

export default User;
