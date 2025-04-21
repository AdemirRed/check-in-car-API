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
      nome: {
        type: Sequelize.STRING,
        allowNull: false, // Nome não pode ser nulo
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false, // Email não pode ser nulo
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false, // Senha não pode ser nula
      },
      papel: {
        type: Sequelize.ENUM('admin', 'usuario'),
        allowNull: false,
        defaultValue: 'usuario',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Usar Sequelize.fn para compatibilidade com PostgreSQL
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'), // Usar Sequelize.fn para compatibilidade com PostgreSQL
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
