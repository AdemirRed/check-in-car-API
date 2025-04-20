// app/middlewares/isAdminMiddleware.js
import User from '../models/users'; // Import direto, sem destructuring

const isAdmin = async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res
      .status(403)
      .json({ erro: 'Acesso negado. Usuário não autenticado.' });
  }

  const userId = req.user.id; // Captura o ID do usuário autenticado

  try {
    const user = await User.findByPk(userId);

    if (!user || user.papel !== 'admin') {
      return res.status(403).json({
        erro: 'Acesso negado: você não tem permissões de administrador.',
      });
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar administrador:', error);
    return res.status(500).json({ erro: 'Erro ao verificar permissões.' });
  }
};

export default isAdmin;
