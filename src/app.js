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
        // Permite qualquer origem ou origens específicas
        const allowedOrigins = ['http://localhost:3001', 'http://redblackspy.ddns.net:3002']; // Substitua pelas origens permitidas
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Permite a origem
        } else {
          callback(new Error('Not allowed by CORS')); // Bloqueia a origem
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
