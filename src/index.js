require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rotas = require('./rotas');

const app = express();

app.use(cors());
app.use(express.json());

app.use(rotas);

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(process.env.PORT);
})
