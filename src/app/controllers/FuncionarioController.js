import { Op } from 'sequelize';
import Funcionario from '../models/funcionario';
import User from '../models/users';


class FuncionarioController {
  // Cadastra um novo funcionário
  async store(req, res) {
    const { nome, cpf, email, telefone, usuario_id } = req.body;

    // 1. Validação dos dados de entrada
    if (!nome || !cpf || !email || !usuario_id) {
      return res.status(400).json({
        erro: 'Campos obrigatórios: nome, cpf, email e usuario_id.',
      });
    }

    try {
      // 2. Verifica se o usuário existe (FK válida)
      const usuario = await User.findByPk(usuario_id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário (usuario_id) não encontrado.' });
      }

      // 3. Verifica se já existe funcionário com mesmo CPF ou e‑mail
      const existe = await Funcionario.findOne({
        where: {
          [Op.or]: [{ cpf }, { email }]
        },
        
      });
      if (existe) {
        return res.status(409).json({ erro: 'Já existe funcionário com mesmo CPF ou e‑mail.' });
      }

      // 4. Cria o funcionário
      const funcionario = await Funcionario.create({
        usuario_id,
        nome,
        cpf,
        email,
        telefone,
      });

      // 5. Retorna apenas os dados públicos
      const { id } = funcionario;
      return res.status(201).json({ id, nome, cpf, email, telefone });
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      return res.status(500).json({
        erro: `Erro ao cadastrar funcionário: ${error.message}`,
      });
    }
  }

  // Lista todos os funcionários (exemplo do index atualizado)
  async index(req, res) {
    try {
      const funcionarios = await Funcionario.findAll({
        attributes: ['id', 'nome', 'cpf', 'email', 'telefone', 'created_at'],
      });

      if (funcionarios.length === 0) {
        return res.status(200).json({ mensagem: 'Nenhum funcionário cadastrado.' });
      }

      return res.json(funcionarios);
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      return res.status(500).json({ erro: 'Erro ao buscar funcionários.' });
    }
  }
}

export default new FuncionarioController();
