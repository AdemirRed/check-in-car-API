'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
        allowNull: false,
        defaultValue: 'usuario',
      },
      criado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      atualizado_em: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('usuarios');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_usuarios_papel";',
    );
  },
};
