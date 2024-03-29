import express from 'express';
import cors from 'cors';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rotaTipoQuarto from './Rotas/rotaTipoQuarto.js';
import rotaQuarto from './Rotas/rotaQuarto.js';
import dotenv from 'dotenv';
import session from 'express-session';
import rotaLogin from './Rotas/rotaLogin.js';
import { verificarAcesso } from './Seguranca/autenticacao.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))

dotenv.config();

app.use('/login',rotaLogin);
app.use('/categoria',verificarAcesso,rotaCategoria);
app.use('/produto',verificarAcesso,rotaProduto);
app.use('/tipoquarto',verificarAcesso,rotaTipoQuarto);
app.use('/quarto',verificarAcesso,rotaQuarto);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})


