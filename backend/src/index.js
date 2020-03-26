const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); // para que o express torne entendível o Json vindo do body
app.use(routes);

app.listen(3333);