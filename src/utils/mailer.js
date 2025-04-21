import 'dotenv/config'; // ✅ Isso já importa e configura seu .env com ESModules
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true, // Adicionado para habilitar logs detalhados
});

async function sendEmail({ to, subject, text, html }) {
  try {
    console.log('📤 Tentando enviar e-mail com os seguintes dados:');
    console.log({ to, subject, text, html });

    const info = await transporter.sendMail({
      from: `"Recuperação de Senha" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('📬 E-mail enviado com sucesso para:', to);
    console.log('📨 Info:', info);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
    console.error('📋 Detalhes do erro:', {
      code: error.code,
      response: error.response,
      responseCode: error.responseCode,
      command: error.command,
    });
    throw new Error('Falha ao enviar e-mail');
  }
}

export default sendEmail;
