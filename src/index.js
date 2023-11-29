require('dotenv').config();
const cors = require('cors')
const express = require('express');
const rotas = require('./rotas.js');

const app = express();
app.use(cors())
app.use(express.json());
app.use(rotas);

app.listen(process.env.PORT);