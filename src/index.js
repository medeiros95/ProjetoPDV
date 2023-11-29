require('dotenv').config();
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser')

const rotas = require('./rotas.js');

const app = express();
app.use(bodyParser.json())

app.use(cors())
app.use(express.json());
app.use(rotas);

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Servidor em pé na porta ${port}`)
})