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
        allowNull: false, // O funcionário é obrigatório
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
        allowNull: true, // A finalidade pode deve ser obrigatória
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
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('registros_uso');
  },
};
