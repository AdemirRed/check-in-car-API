import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import 'dotenv/config';
import sendEmail from '../../utils/mailer.js';
import User from '../models/users.js';

const RECOVERY_LIMIT_TIME = 15 * 60 * 1000; // 15 minutos
const RECOVERY_ATTEMPT_LIMIT = 3;

class AuthController {
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      console.log(`[RECUPERAÇÃO] Iniciando processo para: ${email}`);

      const user = await User.findOne({ where: { email } });

      if (!user) {
        console.warn(`[RECUPERAÇÃO] E-mail não encontrado: ${email}`);
        return res.status(200).json({
          mensagem: 'Se o e‑mail estiver cadastrado, um código foi enviado.',
        });
      }

      const now = new Date();
      const lastAttempt = user.ultima_tentativa_recuperacao || 0;
      const attemptCount = user.tentativas_recuperacao || 0;

      // Verifica se o limite de tentativas foi excedido
      if (attemptCount >= RECOVERY_ATTEMPT_LIMIT && now - lastAttempt < RECOVERY_LIMIT_TIME) {
        return res.status(429).json({
          erro: 'Muitas tentativas de recuperação. Tente novamente mais tarde.',
        });
      }

      // Reseta o contador se o tempo limite passou
      if (now - lastAttempt >= RECOVERY_LIMIT_TIME) {
        user.tentativas_recuperacao = 0;
      }

      // Atualiza as tentativas e o timestamp
      user.tentativas_recuperacao = (user.tentativas_recuperacao || 0) + 1;
      user.ultima_tentativa_recuperacao = now;
      await user.save();

      const codigo = crypto.randomInt(100000, 999999).toString();
      user.codigo_recuperacao = codigo;
      await user.save();

      console.log(`[RECUPERAÇÃO] Código gerado para ${email}: ${codigo}`);

      try {
        await sendEmail({
          to: email,
          subject: 'Recuperação de Senha',
          text: `Seu código de recuperação é: ${codigo}`,
          html: `
            <p>Olá!</p>
            <p>Você solicitou a redefinição de senha. Aqui está seu código:</p>
            <h2>${codigo}</h2>
            <p>Se você não solicitou, ignore este e‑mail.</p>
          `,
        });
        console.log(`[RECUPERAÇÃO] E-mail enviado com sucesso para ${email}`);
      } catch (error) {
        console.error(`[RECUPERAÇÃO] Falha ao enviar e-mail para ${email}:`, error.message);
        return res.status(500).json({
          erro: 'Erro ao enviar e-mail. Por favor, tente novamente mais tarde.',
        });
      }

      return res.status(200).json({
        mensagem: 'Se o e‑mail estiver cadastrado, um código foi enviado.',
      });
    } catch (error) {
      console.error('[RECUPERAÇÃO] Erro interno no envio de código:', error);
      return res.status(500).json({
        erro: 'Erro interno ao processar a solicitação. Tente novamente mais tarde.',
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, codigo, novaSenha } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user || user.codigo_recuperacao !== codigo) {
        return res.status(400).json({ erro: 'Código inválido ou expirado.' });
      }

      const senhaHash = await bcrypt.hash(novaSenha, 8);
      user.senha_hash = senhaHash;
      user.codigo_recuperacao = null;
      await user.save();

      return res
        .status(200)
        .json({ mensagem: 'Senha redefinida com sucesso.' });
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      return res.status(500).json({
        erro: 'Erro ao redefinir senha. Por favor, tente novamente mais tarde.',
      });
    }
  }
}

export default new AuthController();
