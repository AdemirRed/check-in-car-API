import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/users';

class SessionController {
  async store(req, res) {
    const { email, senha_hash } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ erro: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha_hash, user.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Senha inválida.' });
    }

    const { id, nome, papel } = user;

    return res.json({
      usuario: { id, nome, email, papel },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
