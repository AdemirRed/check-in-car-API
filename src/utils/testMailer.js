import 'dotenv/config'; // Para carregar EMAIL_USER e EMAIL_PASS do .env
import nodemailer from 'nodemailer';

async function testarSMTP() {
  const transporter = nodemailer.createTransport({
    host: 'out.dnsexit.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Teste SMTP" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TEST_TO || process.env.EMAIL_USER,
      subject: '✅ Teste de Conexão SMTP',
      text: 'Este é um e-mail de teste enviado via SMTP com Nodemailer.',
    });

    console.log('✅ E-mail enviado com sucesso!');
    console.log('📨 Info:', info);
  } catch (error) {
    console.error('❌ Erro ao tentar enviar e-mail:', error);
  }
}

testarSMTP();
