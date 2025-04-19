import * as Yup from 'yup';
import Funcionario from '../models/funcionario';
import CheckIn from '../models/registroUso';

// Schema de validação para check-in (somente carro_id obrigatório)
const checkinSchema = Yup.object().shape({
  carro_id: Yup.string().required('O campo veiculo é obrigatório.'),
  destino: Yup.string().notRequired(),
  finalidade: Yup.string().notRequired(),
  observacoes: Yup.string().notRequired(),
});

class CheckInController {
  async store(req, res) {
    try {
      // Validação com Yup
      await checkinSchema.validate(req.body, { abortEarly: false });

      const { carro_id, destino, finalidade, observacoes } = req.body;

      // Recupera o usuário autenticado do token
      const usuarioId = req.user.usuario_id;

      // Busca o funcionário vinculado ao usuário
      const funcionario = await Funcionario.findOne({
        where: { usuario_id: usuarioId },
      });

      if (!funcionario) {
        return res.status(404).json({
          erro: 'Funcionário não encontrado para este usuário.',
        });
      }

      // Cria o check-in
      const checkIn = await CheckIn.create({
        funcionario_id: funcionario.id,
        veiculo_id: carro_id,
        destino,
        finalidade,
        observacoes,
        data_hora_saida: new Date(),
      });

      return res.status(201).json(checkIn);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ erros: error.errors });
      }

      console.error('Erro ao registrar check-in:', error);
      return res.status(500).json({ erro: 'Erro ao registrar check-in.' });
    }
  }

  async index(req, res) {
    try {
      const checkins = await CheckIn.findAll();
      return res.json(checkins);
    } catch (error) {
      console.error('Erro ao buscar check-ins:', error);
      return res.status(500).json({ erro: 'Erro ao buscar check-ins.' });
    }
  }
}

export default new CheckInController();
