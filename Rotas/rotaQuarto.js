import { Router } from "express";
import QuartoCtrl from "../Controle/quartoCtrl.js";


const quartoCtrl = new QuartoCtrl();
const rotaquarto = new Router();

rotaquarto
.get('/', quartoCtrl.consultar)
.get('/:termo', quartoCtrl.consultar)
.post('/', quartoCtrl.gravar)
.patch('/', quartoCtrl.atualizar)
.put('/', quartoCtrl.atualizar)
.delete('/', quartoCtrl.excluir);

export default rotaquarto;