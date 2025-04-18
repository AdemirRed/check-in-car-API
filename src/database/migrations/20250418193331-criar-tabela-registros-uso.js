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
      funcionario_id: {
        type: Sequelize.UUID,
        references: {
          model: 'funcionarios',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      finalidade: Sequelize.STRING,
      destino: Sequelize.STRING,
      data_hora_saida: Sequelize.DATE,
      data_hora_retorno: Sequelize.DATE,
      observacoes: Sequelize.TEXT,
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
    await queryInterface.dropTable('registros_uso');
  },
};
