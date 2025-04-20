import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/users';
import * as Yup from 'yup';

// Schema de validação de login
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('O formato do e-mail é inválido')
    .required('O e-mail é obrigatório'),
  senha_hash: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

class SessionController {
  async store(req, res) {
    // Validação dos dados de login
    try {
      await loginSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Verifica se há erro de mínimo de caracteres na senha
        const minError = error.inner.find(
          (err) => err.path === 'senha_hash' && err.type === 'min',
        );
        if (minError) {
          return res.status(400).json({ erro: minError.message });
        }
      }
      // Mensagem genérica para falha de autenticação
      return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
    }

    const { email, senha_hash } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
      }

      const senhaValida = await bcrypt.compare(senha_hash, user.senha_hash);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
      }

      const { id, nome, papel } = user;
      const token = jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        usuario: { id, nome, email, papel },
        token,
      });
    } catch (error) {
      console.error('Erro na autenticação:', error);
      return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
  }
}

export default new SessionController();
