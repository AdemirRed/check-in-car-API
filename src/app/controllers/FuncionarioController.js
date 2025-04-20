/* eslint-disable no-unused-vars */
import crypto from 'crypto';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import Funcionario from '../models/funcionario';
import User from '../models/users';

const ENCRYPTION_KEY = Buffer.from(process.env.CPF_ENCRYPTION_KEY, 'hex'); // 32 bytes
const IV_LENGTH = 16;

// Criptografa usando AES-256-CBC
function encryptCPF(cpf) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(cpf, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// Descriptografa
function decryptCPF(encryptedCpf) {
  try {
    const [ivHex, encrypted] = encryptedCpf.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    return null;
  }
}

// Schema de validação de funcionário
const funcionarioSchema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('O e-mail deve ser válido')
    .required('O e-mail é obrigatório'),
  usuario_id: Yup.string().required('O ID do usuário é obrigatório'),
  telefone: Yup.string().notRequired(),
  cpf: Yup.string().length(11, 'O CPF deve ter 11 caracteres').notRequired(),
});

class FuncionarioController {
  // Cadastra um novo funcionário
  async store(req, res) {
    try {
      await funcionarioSchema.validate(req.body, { abortEarly: false });

      const { nome, cpf, email, telefone, usuario_id } = req.body;

      const usuario = await User.findByPk(usuario_id);
      if (!usuario) {
        return res
          .status(404)
          .json({ erro: 'Usuário (usuario_id) não encontrado.' });
      }

      const cpfCriptografado = cpf ? encryptCPF(cpf) : null;

      const existe = await Funcionario.findOne({
        where: {
          [Op.or]: [{ email }, { cpf: cpfCriptografado }],
        },
      });

      if (existe) {
        return res
          .status(409)
          .json({ erro: 'Já existe funcionário com mesmo CPF ou e‑mail.' });
      }

      const funcionario = await Funcionario.create({
        usuario_id,
        nome,
        cpf: cpfCriptografado,
        email,
        telefone,
      });

      return res.status(201).json({
        id: funcionario.id,
        nome,
        cpf: cpfCriptografado,
        email,
        telefone,
      });
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ erros: error.errors });
      }
      return res
        .status(500)
        .json({ erro: `Erro ao cadastrar funcionário: ${error.message}` });
    }
  }

  // Lista todos os funcionários
  async index(req, res) {
    try {
      const funcionarios = await Funcionario.findAll({
        attributes: ['id', 'nome', 'cpf', 'email', 'telefone', 'created_at'],
      });

      if (funcionarios.length === 0) {
        return res
          .status(200)
          .json({ mensagem: 'Nenhum funcionário cadastrado.' });
      }

      const resultado = funcionarios.map((func) => {
        const dados = func.get({ plain: true });
        dados.cpf = dados.cpf ? decryptCPF(dados.cpf) : null;
        return dados;
      });

      return res.json(resultado);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      return res.status(500).json({ erro: 'Erro ao buscar funcionários.' });
    }
  }
}

export default new FuncionarioController();
