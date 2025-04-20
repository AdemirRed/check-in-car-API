import { Sequelize } from 'sequelize';

import Funcionario from '../app/models/funcionario.js'; // ✅ novo import
import multa from '../app/models/multa'; // ✅ novo import
import RegistroUso from '../app/models/registroUso';
import User from '../app/models/users';
import Veiculo from '../app/models/veiculo';
import configDatabase from '../config/database';

const models = [User, Funcionario, Veiculo, RegistroUso, multa]; // ✅ adicionado Funcionario

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    models.forEach((model) => model.init(this.connection)); // ✅ inicializa todos
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models); // ✅ define relacionamentos
      }
    });
  }
}

export default new Database();
