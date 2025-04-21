import User from '../models/users';

class SessaoController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      // Validação básica
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Busca o usuário no banco de dados
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Valida a senha (substitua pela lógica de validação real)
      const isPasswordValid = password === user.password; // Exemplo simples
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      // Retorna sucesso
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error in SessaoController:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new SessaoController();
