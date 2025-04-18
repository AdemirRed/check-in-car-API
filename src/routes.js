import { Router } from 'express';
import User from './app/models/users';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    nome: 'Ademir Moraes',
    email: 'ademair@gmail.com',
    senha_hash: '123456', // Em produção, sempre use hash com bcrypt!
    papel: 'admin', // Ou 'usuario'
  });
  return res.status(201).json(user);
});

export default routes;
