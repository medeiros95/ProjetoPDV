require('dotenv').config();
const express = require('express');
const rotas = require('./rotas.js');

const app = express();

app.use(express.json());
app.use(rotas);

app.listen(process.env.PORT);