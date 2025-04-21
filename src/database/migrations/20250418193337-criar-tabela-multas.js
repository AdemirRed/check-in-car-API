'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('multas', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      registro_uso_id: {
        type: Sequelize.UUID,
        references: {
          model: 'registros_uso',
          key: 'id',
        },
        allowNull: true, // Pode ser nulo, caso não haja registro de uso
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      usuario_responsavel_id: {
        type: Sequelize.UUID,
        references: {
          model: 'usuarios', // Alterado de 'funcionarios' para 'usuarios'
          key: 'id',
        },
        allowNull: true, // Pode ser nulo, caso não haja responsável identificado
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      data_multa: {
        type: Sequelize.DATE,
        allowNull: false, // Data da multa não pode ser nula
      },
      descricao: Sequelize.STRING,
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false, // O valor da multa não pode ser nulo
      },
      paga: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('multas');
  },
};
