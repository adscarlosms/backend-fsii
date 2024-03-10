import Cliente from "../Modelo/cliente.js";
import Pedido from "../Modelo/pedido.js";
import Produto from "../Modelo/produto.js";
import ItemPedido from "../Modelo/itemPedido.js";


export default class PedidoCtrl {
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            
            const cliente = dados.cliente;
            const dataPedido = dados.dataPedido;
            const totalPedido = dados.totalPedido;
            const itensPedido = dados.itens;

            const objCliente = new Cliente(cliente.codigo);//verificar***
            
            let itens = [];



            for (const item of itensPedido) {
              
                const produto = new Produto(item.codigo);

                const objItem = new ItemPedido(produto, item.quantidade, item.precoUnitario, item.subtotal);
                itens.push(objItem);
            }
            //tratar erro aqui.....
            const pedido = new Pedido(0, objCliente, dataPedido, totalPedido, itens);

            pedido.gravar().then(() => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Pedido gravado com sucesso!",
                    "codigo": pedido.codigo
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao gravar o pedido: " + erro.message
                })
            })
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');

        if (requisicao.method === 'GET') {
            const termo = requisicao.params.termo;
            if(!isNaN(termo)){
                const pedido = new Pedido(0);
                pedido.consultar(termo).then((listaPedidos) => {
                    resposta.status(200).json({
                        "status": true,
                        "listaPedidos": listaPedidos
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar o pedido: " + erro.message
                    });
                });
            }
        }
    }
}