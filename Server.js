const http = require('http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Olá mundo!'
  }));
});

server.listen(8000, () => console.log("Servidor está rodando na porta 8000!!"));