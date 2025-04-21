class SomeController {
  async someProtectedRoute(req, res) {
    const userRole = req.userRole;

    if (userRole !== 'admin') {
      return res.status(403).json({ erro: 'Acesso negado.' });
    }

    return res.status(200).json({ mensagem: 'Acesso permitido.' });
  }
}

export default new SomeController();
