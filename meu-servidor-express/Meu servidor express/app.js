const express = require('express');
const app = express();
const PORT = 3000;

// Rota Principal
app.get('/', (req, res) => {
    res.send('<h1>Servidor Express funcionando!</h1><p>Código criado e pronto para o GitHub.</p>');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});