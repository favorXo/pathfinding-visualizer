const express = require('express');
const port = process.env.PORT || 3000;


const app = express();

app.use(express.static('build'))

app.listen(port);