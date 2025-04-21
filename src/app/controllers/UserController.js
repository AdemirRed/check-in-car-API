import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/users';

// Schema de validação definido diretamente no controller
const userSchema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  senha_hash: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  papel: Yup.string()
    .oneOf(['admin', 'usuario'], 'O papel deve ser admin ou usuario')
    .default('usuario'),
});

class UserController {
  async store(req, res) {
    try {
      // Validação dos dados de entrada usando schema
      await userSchema.validate(req.body, { abortEarly: false });

      const { nome, email, senha_hash, papel } = req.body;

      const usuarioExiste = await User.findOne({ where: { email } });
      if (usuarioExiste) {
        return res
          .status(409)
          .json({ erro: 'Já existe um usuário cadastrado com este e-mail.' });
      }

      const senhaCriptografada = await bcrypt.hash(senha_hash, 8);

      const usuario = await User.create({
        id: uuidv4(),
        nome,
        email,
        senha_hash: senhaCriptografada,
        papel: papel === 'admin' ? 'admin' : 'usuario',
      });

      return res
        .status(201)
        .json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Retorna todas as mensagens de validação
        return res.status(400).json({ erros: error.errors });
      }

      console.error('Erro ao criar usuário:', error);
      return res
        .status(500)
        .json({ erro: `Erro ao criar usuário: ${error.message}` });
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
      return res.status(500).json({ erro: 'Erro ao buscar usuários.' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'papel'],
      });

      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    }
  }
}

export default new UserController();
