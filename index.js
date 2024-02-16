import express from 'express';
import cors from 'cors';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaTipoQuarto from './Rotas/rotaTipoQuarto.js';
import rotaQuarto from './Rotas/rotaQuarto.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/categoria',rotaCategoria);
app.use('/produto',rotaProduto);
app.use('/tipoquarto',rotaTipoQuarto);
app.use('/quarto',rotaQuarto);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
