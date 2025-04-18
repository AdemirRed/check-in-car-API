import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/users';

class UserController {
  async store(req, res) {
    try {
      const { nome, email, senha_hash, papel } = req.body;

      if (!nome || !email || !senha_hash) {
        return res.status(400).json({
          erro: 'Campos obrigatórios: nome, email e senha.',
        });
      }

      const usuarioExiste = await User.findOne({ where: { email } });

      if (usuarioExiste) {
        return res.status(400).json({
          erro: 'Já existe um usuário cadastrado com este e-mail.',
        });
      }

      const senhaCriptografada = await bcrypt.hash(senha_hash, 8);

      const usuario = await User.create({
        id: uuidv4(),
        nome,
        email,
        senha_hash: senhaCriptografada,
        papel: papel === 'admin' ? 'admin' : 'usuario', // Evita criar admins arbitrários
      });

      return res.status(201).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({
        erro: `Erro ao criar usuário: ${error.message}`,
      });
    }
  }

  async index(req, res) {
    try {
      const usuarios = await User.findAll({
        attributes: ['id', 'nome', 'email'],
      });
      return res.json(usuarios);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return res.status(500).json({
        erro: 'Erro ao buscar usuários.',
      });
    }
  }
}

export default new UserController();
