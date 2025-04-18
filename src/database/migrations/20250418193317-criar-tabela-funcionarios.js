'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionarios', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false, // Nome obrigatório
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true, // CPF obrigatório
        unique: true, // CPF único
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Email obrigatório
        unique: true, // Email único
      },
      telefone: Sequelize.STRING,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('funcionarios');
  },
};
