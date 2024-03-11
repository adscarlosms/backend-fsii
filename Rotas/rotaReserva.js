import { Router } from "express";
import ReservaCtrl from "../Controle/reservaCtrl.js";


const reservaCtrl = new ReservaCtrl();
const rotaReserva = new Router();

rotaReserva
.get('/:termo', reservaCtrl.consultar)
.post('/', reservaCtrl.gravar)


export default rotaReserva;