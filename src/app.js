import cors from 'cors'; // Adicione esta linha
import express from 'express';
import './database';
import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  // Middleware
  middleware() {
    this.app.use(cors()); // Adicione esta linha para habilitar CORS
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(routes);
  }
}
export default new App().app;
