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
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      registro_uso_id: {
        type: Sequelize.UUID,
        references: {
          model: 'registros_uso',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      funcionario_responsavel_id: {
        type: Sequelize.UUID,
        references: {
          model: 'funcionarios',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      data_multa: Sequelize.DATE,
      descricao: Sequelize.STRING,
      valor: Sequelize.DECIMAL,
      paga: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('multas');
  },
};
