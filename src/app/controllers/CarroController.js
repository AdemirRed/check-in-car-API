import Carro from '../models/veiculo';

class CarroController {
  async store(req, res) {
    const { modelo, placa } = req.body;

    try {
      const carro = await Carro.create({ modelo, placa });
      return res.status(201).json(carro);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao cadastrar carro.' });
    }
  }

  async index(req, res) {
    try {
      const carros = await Carro.findAll();
      return res.json(carros);
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao buscar carros.' });
    }
  }
}

export default new CarroController();
