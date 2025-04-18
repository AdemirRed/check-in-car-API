'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('veiculos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      placa: { type: Sequelize.STRING, unique: true },
      marca: Sequelize.STRING,
      modelo: Sequelize.STRING,
      cor: Sequelize.STRING,
      renavam: Sequelize.STRING,
      status: Sequelize.STRING,
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
    await queryInterface.dropTable('veiculos');
  },
};
