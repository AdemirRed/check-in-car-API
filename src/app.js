import cors from 'cors';
import express from 'express';
import './database/index.js';
import routes from './routes.js';

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors({
      origin: function (origin, callback) {
        // Permite qualquer origem, mas respeitando o uso de credentials
        if (origin) {
          callback(null, origin); // Retorna a origem da requisição
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // Permite envio de cookies e headers Authorization
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
