import { Router } from 'express';

import CarroController from './app/controllers/CarroController';
import CheckInController from './app/controllers/CheckInController';
import FuncionarioController from './app/controllers/FuncionarioController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/authMiddleware';

const routes = new Router();

// Rota pública para login
routes.post('/sessao', SessionController.store); // Cria uma sessão de login para o usuário

// Rota pública para criar primeiro usuário (admin inicial, se quiser)
routes.post('/usuarios', UserController.store); // Cria um novo usuário

// Aplicar middleware para proteger todas as rotas abaixo:
routes.use(authMiddleware);

// Rotas protegidas
routes.get('/usuarios', UserController.index); // Lista todos os usuários

routes.post('/funcionarios', FuncionarioController.store); // Cadastra um novo funcionário
routes.get('/funcionarios', FuncionarioController.index); // Lista todos os funcionários

routes.post('/carros', CarroController.store); // Cadastra um novo carro
routes.get('/carros', CarroController.index); // Lista todos os carros

routes.post('/checkins', CheckInController.store); // Registra um novo check-in
routes.get('/checkins', CheckInController.index); // Lista todos os check-ins

export default routes;
