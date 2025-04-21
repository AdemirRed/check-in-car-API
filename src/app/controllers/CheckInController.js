import * as Yup from 'yup';
import Funcionario from '../models/funcionario';
import CheckIn from '../models/registroUso';

const checkinSchema = Yup.object().shape({
  veiculo_id: Yup.string().required('O campo veiculo é obrigatório.'),
  funcionario_id: Yup.string().notRequired(), // não usado aqui diretamente
  destino: Yup.string().notRequired(),
  finalidade: Yup.string().notRequired(),
  observacoes: Yup.string().notRequired(),
});

class CheckInController {
  async store(req, res) {
    try {
      console.log('🔁 Iniciando processo de check-in...');

      // Exibe o corpo da requisição
      console.log('📦 Body recebido:', req.body);

      // Validação com Yup
      await checkinSchema.validate(req.body, { abortEarly: false });

      const { veiculo_id, destino, finalidade, observacoes } = req.body;

      // Recupera o usuário autenticado do token
      console.log('🔐 Dados do usuário autenticado:', req.user);
      const usuarioId = req.user?.usuario_id;

      if (!usuarioId) {
        console.warn('⚠️ Usuário não autenticado.');
        return res.status(401).json({ erro: 'Usuário não autenticado.' });
      }

      // Verifica se existe um funcionário vinculado ao usuário
      const funcionario = await Funcionario.findOne({
        where: { usuario_id: usuarioId },
      });
      
      if (!funcionario) {
        console.warn(`⚠️ Nenhum funcionário encontrado para o usuário com ID: ${usuarioId}`);
        return res.status(404).json({
          erro: 'Funcionário não encontrado para este usuário.',
        });
      }

      console.log('✅ Funcionário localizado:', funcionario.id);

      // Cria o check-in
      const checkIn = await CheckIn.create({
        funcionario_id: funcionario.id,
        veiculo_id,
        destino,
        finalidade,
        observacoes,
        data_hora_saida: new Date(),
        data_hora_retorno: null, // Inicializa como null
      });

      console.log('✅ Check-in registrado com sucesso:', checkIn.id);

      return res.status(201).json(checkIn);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.error('❌ Erros de validação:', error.errors);
        return res.status(400).json({ erros: error.errors });
      }

      console.error('❌ Erro inesperado ao registrar check-in:', error);
      return res.status(500).json({ erro: 'Erro ao registrar check-in.' });
    }
  }

  async index(req, res) {
    try {
      const querySchema = Yup.object().shape({
        veiculo_id: Yup.string().notRequired(),
        destino: Yup.string().notRequired(),
        finalidade: Yup.string().notRequired(),
      });

      await querySchema.validate(req.query, { abortEarly: false });

      console.log('🔍 Buscando todos os check-ins...');
      const checkins = await CheckIn.findAll();
      return res.json(checkins);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.error('❌ Erros de validação na query:', error.errors);
        return res.status(400).json({ erros: error.errors });
      }

      console.error('❌ Erro ao buscar check-ins:', error);
      return res.status(500).json({ erro: 'Erro ao buscar check-ins.' });
    }
  }
}

export default new CheckInController();
