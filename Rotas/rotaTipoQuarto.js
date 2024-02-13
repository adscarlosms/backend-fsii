import { Router } from "express";
import TipoQuartoCtrl from "../Controle/tipoQuartoCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const tipoQuartoCtrl = new TipoQuartoCtrl();
const rotaTipoQuarto = new Router();

rotaTipoQuarto
.get('/',tipoQuartoCtrl.consultar)
.get('/:termo', tipoQuartoCtrl.consultar)
.post('/',tipoQuartoCtrl.gravar)
.patch('/',tipoQuartoCtrl.atualizar)
.put('/',tipoQuartoCtrl.atualizar)
.delete('/',tipoQuartoCtrl.excluir);

export default rotaTipoQuarto;