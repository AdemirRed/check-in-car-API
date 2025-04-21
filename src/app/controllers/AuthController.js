/* eslint-disable no-unused-vars */
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

      const user = await User.findOne({ where: { email } });

      if (!user) {
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

      // Define a expiração do código (ex.: 5 minutos a partir de agora)
      user.codigo_recuperacao_expiracao = new Date(now.getTime() + 5 * 60 * 1000);
      await user.save();

      try {
        await sendEmail({
          to: email,
          subject: 'Código de Recuperação de Senha – Check-In Car',
          text: `Olá,
        
        Recebemos uma solicitação para redefinir a senha da sua conta no sistema Check-In Car.
        
        Seu código de verificação é: ${codigo}
        
        Se você não solicitou essa alteração, ignore este e‑mail.
        
        Atenciosamente,
        Equipe Check-In Car`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="color: #333;">Recuperação de Senha</h2>
              <p>Olá,</p>
              <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Check-In Car</strong>.</p>
              <p>Utilize o código abaixo para prosseguir com a redefinição:</p>
              <div style="font-size: 24px; font-weight: bold; color: #2c3e50; margin: 20px 0;">
                ${codigo}
              </div>
              <p>Este código é válido por tempo limitado e deve ser utilizado apenas por você.</p>
              <p style="color: #999; font-size: 14px;">Se você não solicitou a alteração, nenhuma ação é necessária. Sua conta permanecerá segura.</p>
              <hr style="margin: 30px 0;">
              <p style="font-size: 12px; color: #aaa;">Este é um e-mail automático. Por favor, não responda.</p>
              <p style="font-size: 12px; color: #aaa;">Check-In Car © ${new Date().getFullYear()}</p>
            </div>
          `,
        });
      } catch (error) {
        return res.status(500).json({
          erro: 'Erro ao enviar e-mail. Por favor, tente novamente mais tarde.',
        });
      }

      return res.status(200).json({
        mensagem: 'Se o e‑mail estiver cadastrado, um código foi enviado.',
      });
    } catch (error) {
      return res.status(500).json({
        erro: 'Erro interno ao processar a solicitação. Tente novamente mais tarde.',
      });
    }
  }

  async resetPassword(req, res) {
    try {
      const { email, codigo, novaSenha } = req.body;

      const user = await User.findOne({ where: { email } });

      // Verifica se o código é válido e não expirou
      const now = new Date();
      if (!user || user.codigo_recuperacao !== codigo || now > user.codigo_recuperacao_expiracao) {
        return res.status(400).json({ erro: 'Código inválido ou expirado.' });
      }

      const senhaHash = await bcrypt.hash(novaSenha, 8);
      user.senha_hash = senhaHash;
      user.codigo_recuperacao = null;
      user.codigo_recuperacao_expiracao = null; // Limpa a expiração
      await user.save();

      return res
        .status(200)
        .json({ mensagem: 'Senha redefinida com sucesso.' });
    } catch (error) {
      return res.status(500).json({
        erro: 'Erro ao redefinir senha. Por favor, tente novamente mais tarde.',
      });
    }
  }
}

export default new AuthController();
