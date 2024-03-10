import { Router } from "express";
import ClienteCtrl from "../Controle/clienteCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const clienteCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaCliente
//.get('/',clienteCtrl.consultarPorNome)
//.get('/:termo', clienteCtrl.consultarPorTelefone)
.post('/',clienteCtrl.gravar)
.put('/',clienteCtrl.atualizar)
.delete('/',clienteCtrl.excluir);

export default rotaCliente;