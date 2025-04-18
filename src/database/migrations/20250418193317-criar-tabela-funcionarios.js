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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('funcionarios');
  },
};
