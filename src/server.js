require('dotenv').config(); // Adicione esta linha
import app from './app';

const port = process.env.PORT || 3001;
const host = process.env.HOST || '0.0.0.0'; // Adicione esta linha

app.listen(port, host, () => {
  // Atualize aqui para incluir o host
  console.log(`Server is running on http://${host}:${port}`);
});
