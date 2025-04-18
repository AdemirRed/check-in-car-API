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
      placa: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false, // A placa deve ser obrigatória
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false, // Marca do veículo também obrigatória
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: true, // Modelo do veículo 
      },
      cor: Sequelize.STRING,
      renavam: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true, // RENAVAM 
      },
      status: {
        type: Sequelize.ENUM('ativo', 'inativo', 'em manutenção'),
        allowNull: false, // Status obrigatória
        defaultValue: 'ativo', // Default 'ativo'
      },
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
    await queryInterface.dropTable('veiculos');
  },
};
