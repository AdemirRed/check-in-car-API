import cors from 'cors'; // Adicione esta linha
import express from 'express';
import './database/index.js';
import routes from './routes.js';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  // Middleware
  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: 'http://192.168.0.200:3002',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permitir métodos específicos
        allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos específicos
      }),
    );
  }

  routes() {
    this.app.use(routes);
  }
}
export default new App().app;
