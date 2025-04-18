import CheckIn from '../models/registroUso'; // Supondo que o modelo de check-in seja chamado RegistroUso

class CheckInController {
  async store(req, res) {
    const { funcionario_id, carro_id, destino } = req.body;

    try {
      const checkIn = await CheckIn.create({
        funcionario_id,
        carro_id,
        destino,
        data_hora_saida: new Date(), // Registro automático do momento de saída
      });

      return res.status(201).json(checkIn);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao registrar check-in.' });
    }
  }

  async index(req, res) {
    try {
      const checkins = await CheckIn.findAll();
      return res.json(checkins);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar check-ins.' });
    }
  }
}

export default new CheckInController();
