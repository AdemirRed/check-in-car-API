import { Router } from 'express';

import CarroController from './app/controllers/CarroController';
import CheckInController from './app/controllers/CheckInController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import AuthController from './app/controllers/AuthController';
import authMiddleware from './app/middlewares/authMiddleware';
import isAdmin from './app/middlewares/isAdminMiddleware'; // Middleware de admin

const routes = new Router();

// Rota pública para login
routes.post('/sessao', SessionController.store); // Cria uma sessão de login para o usuário

// Rota pública para criar primeiro usuário (admin inicial, se quiser)
routes.post('/usuarios', UserController.store); // Cria um novo usuário

routes.get('/carros', CarroController.index); // Lista todos os carros

routes.post('/esqueci-senha', AuthController.forgotPassword);
routes.post('/redefinir-senha', AuthController.resetPassword);
routes.post('/verificar-email', UserController.verifyEmail); // Verifica se o e-mail existe no banco
// Aplicar middleware para proteger todas as rotas abaixo:
routes.use(authMiddleware);

// Rotas protegidas
routes.post('/checkins', CheckInController.store); // Registra um novo check-in
routes.get('/checkins', CheckInController.index); // Lista todos os check-ins

// Rotas protegidas
routes.get('/usuarios', isAdmin, UserController.index); // Lista todos os usuários
routes.get('/usuarios/:id',  UserController.show); // Mostra um usuário específico



routes.post('/carros', isAdmin, CarroController.store); // Cadastra um novo carro


export default routes;
