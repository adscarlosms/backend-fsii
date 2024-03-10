import { Router } from "express";
import PedidoCtrl from "../Controle/pedidoCtrl.js";

const pedidoCtrl = new PedidoCtrl();
const rotaPedido = new Router();

rotaPedido
.get('/:termo', pedidoCtrl.consultar)
.post('/', pedidoCtrl.gravar)


export default rotaPedido;