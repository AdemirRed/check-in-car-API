'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('veiculos', 'marca', {
      type: Sequelize.STRING,
      allowNull: true, // Permitir valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Preencher valores nulos antes de aplicar a restrição
    await queryInterface.sequelize.query(`
      UPDATE veiculos
      SET marca = 'Desconhecida'
      WHERE marca IS NULL;
    `);

    await queryInterface.changeColumn('veiculos', 'marca', {
      type: Sequelize.STRING,
      allowNull: false, // Reverter para não permitir valores nulos
    });
  },
};
