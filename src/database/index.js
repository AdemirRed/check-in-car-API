import { Sequelize } from 'sequelize';
import multa from '../app/models/multa';
import RegistroUso from '../app/models/registroUso';
import User from '../app/models/users';
import Veiculo from '../app/models/veiculo';
import configDatabase from '../config/database';

const models = [User, Veiculo, RegistroUso, multa];

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
