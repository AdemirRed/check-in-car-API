import * as Yup from 'yup';
import veiculos from '../models/veiculo';

// Schema de validação de veículo
const veiculoSchema = Yup.object().shape({
  modelo: Yup.string().notRequired(),
  placa: Yup.string().required('A placa é obrigatória'),
  marca: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(['ativo', 'inativo', 'em manutenção'], 'Status inválido')
    .default('ativo'),
});

class veiculosController {
  async store(req, res) {
    try {
      // Validação dos dados
      await veiculoSchema.validate(req.body, { abortEarly: false });

      const { modelo, placa, marca, status = 'ativo' } = req.body;

      const veiculoExistente = await veiculos.findOne({ where: { placa } });
      if (veiculoExistente) {
        return res
          .status(400)
          .json({ erro: 'Já existe um veículo cadastrado com esta placa.' });
      }

      const veiculo = await veiculos.create({ modelo, placa, marca, status });
      return res.status(201).json(veiculo);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return res.status(400).json({ erros: error.errors });
      }

      console.error('Erro ao cadastrar veículo:', error);
      return res.status(500).json({
        erro: 'Erro ao cadastrar veículo. Verifique os dados e tente novamente.',
      });
    }
  }

  async index(req, res) {
    try {
      const veiculosList = await veiculos.findAll({
        attributes: [
          'id',
          'placa',
          'modelo',
          'marca',
          'cor',
          'status',
          'created_at',
          'updated_at',
        ], // Especifique os campos desejados
      });

      if (veiculosList.length === 0) {
        return res.status(200).json({ mensagem: 'Nenhum veículo cadastrado.' });
      }

      // Remover campos duplicados (createdAt e updatedAt)
      const resultado = veiculosList.map((veiculo) => {
        const dados = veiculo.get({ plain: true });
        return dados;
      });

      return res.json(resultado);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      return res.status(500).json({
        erro: 'Erro ao buscar veículos. Tente novamente mais tarde.',
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const veiculo = await veiculos.findByPk(id, {
        attributes: [
          'id',
          'placa',
          'modelo',
          'marca',
          'cor',
          'status',
          'created_at',
          'updated_at',
        ], // Especifique os campos desejados
      });

      if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
      }

      return res.status(200).json(veiculo);
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
      return res.status(500).json({
        erro: 'Erro ao buscar veículo. Tente novamente mais tarde.',
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Verifica se o status é válido
      if (!['ativo', 'inativo', 'em manutenção'].includes(status)) {
        return res.status(400).json({ erro: 'Status inválido.' });
      }

      const veiculo = await veiculos.findByPk(id);

      if (!veiculo) {
        return res.status(404).json({ erro: 'Veículo não encontrado.' });
      }

      veiculo.status = status;
      await veiculo.save();

      return res.status(200).json({ mensagem: 'Status atualizado com sucesso.', veiculo });
    } catch (error) {
      console.error('Erro ao atualizar status do veículo:', error);
      return res.status(500).json({
        erro: 'Erro ao atualizar status do veículo. Tente novamente mais tarde.',
      });
    }
  }
}

export default new veiculosController();
