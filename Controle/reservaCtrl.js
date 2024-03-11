import Cliente from "../Modelo/cliente.js";
import Reserva from "../Modelo/reserva.js";
import Quarto from "../Modelo/quarto.js";
import Reserva_Cliente from "../Modelo/reservaCliente.js";


export default class ReservaCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const cliente = dados.cliente;
            const data_inicio = dados.data_inicio;
            const data_fim = dados.data_fim;
            const itensreserva = dados.quartosReservados;
            //const itensreserva = dados.quartos;
            const objCliente = new Cliente(cliente.codigo);
            
            let itens = [];

            for (const item of itensreserva) {
              
                const quarto = new Quarto(item.quarto.quarto_codigo);

                //const objItem = new Reserva_Cliente(quarto, item.cliente_codigo, item.quarto_codigo);
                //const objItem = new Reserva_Cliente(reserva_codigo,quarto);
                const objItem = new Reserva_Cliente(codigo,quarto)
                itens.push(objItem);
            }
          
            const reserva = new Reserva(0, objCliente, data_inicio, data_fim, itens);

            reserva.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "reserva gravada com sucesso!",
                    "codigo": reserva.codigo
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao gravar a reserva: " + erro.message
                })
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const termo = requisicao.params.termo;
            if(!isNaN(termo)){
                const reserva = new Reserva(0);
                reserva.consultar(termo).then((listareservas) => {
                    resposta.status(200).json({
                        "status": true,
                        "listareservas": listareservas
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar a reserva: " + erro.message
                    });
                });
            }
        }
    }
}