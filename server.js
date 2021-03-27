const express = require('express');
const port = process.env.PORT || 3000;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();

app.use(express.static('build'))

app.listen(port);