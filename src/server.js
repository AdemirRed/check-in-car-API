require('dotenv').config(); // Carrega variáveis do .env
import { WebSocketServer } from 'ws'; // Importa WebSocketServer
import app from './app.js'; // Importa a aplicação
import cors from 'cors';

const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0'; // Fallback para qualquer interface

// Configuração do CORS
app.use(cors({
  origin: '*', // Permite qualquer origem
  methods: ['GET', 'POST', 'PATCH'], // Permite apenas os métodos necessários, incluindo PATCH
  allowedHeaders: ['Content-Type', 'Authorization'], // Permite os cabeçalhos necessários
}));

const wsPort = process.env.PORT_SERVER || 3002; // Usa a porta do .env ou fallback para 3002

let wss;
try {
  // Tenta iniciar o servidor WebSocket na porta definida
  wss = new WebSocketServer({ port: wsPort });
  console.log(`WebSocket server running on port ${wsPort}`);
} catch (error) {
  // Se a porta já estiver em uso, loga o erro e encerra a aplicação
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${wsPort} is already in use. Please free the port or use a different one.`);
    process.exit(1);
  } else {
    throw error;
  }
}

// Conexão WebSocket
wss.on('connection', (ws, req) => {
  const params = new URLSearchParams(req.url.split('?')[1]);
  const token = params.get('token'); // Obtém o token passado na URL

  // Validação simples do token - considere usar algo mais robusto como JWT
  if (token !== '94mBxZoPdDgY') { // Substitua pelo token esperado ou lógica de validação mais segura
    ws.close(1008, 'Invalid token'); // Fecha a conexão com código de política de violação
    console.log('WebSocket connection rejected: Invalid token');
    return;
  }

  console.log('WebSocket connection established');

  // Ouve por mensagens recebidas no WebSocket
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send('Message received');
  });

  // Fecha a conexão WebSocket quando o cliente desconectar
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Inicia o servidor Express
app.listen(port, host, () => {
  const displayHost = host === '0.0.0.0' ? 'localhost' : host;
  console.log(`🚀 Server running at http://${displayHost}:${port}`);
});
