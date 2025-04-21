'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registros_uso', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.UUID,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        allowNull: false, // O usuário é obrigatório
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      veiculo_id: {
        type: Sequelize.UUID,
        references: {
          model: 'veiculos',
          key: 'id',
        },
        allowNull: false, // O veículo é obrigatório
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      finalidade: {
        type: Sequelize.STRING,
        allowNull: true, // A finalidade pode ser opcional
      },
      destino: Sequelize.STRING,
      data_hora_saida: {
        type: Sequelize.DATE,
        allowNull: false, // A data e hora de saída devem ser obrigatórias
      },
      data_hora_retorno: {
        type: Sequelize.DATE,
        allowNull: true, // A data e hora de retorno não é obrigatória
      },
      observacoes: Sequelize.TEXT,
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
    await queryInterface.dropTable('registros_uso');
  },
};
