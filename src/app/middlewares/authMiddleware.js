/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Adiciona os dados do usuário ao objeto req
    req.user = {
      id: decoded.id,
      usuario_id: decoded.usuario_id, // Certifique-se de que o token contém `usuario_id`
      papel: decoded.papel, // Adiciona o papel do usuário (admin ou usuário)
      nome: decoded.nome, // Adiciona o nome do usuário
    };

    return next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};
