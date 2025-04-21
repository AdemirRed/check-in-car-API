'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('veiculos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Garante que o UUID seja gerado automaticamente
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
        allowNull: true, // Marca do veículo também obrigatória
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
    await queryInterface.dropTable('veiculos');
  },
};
