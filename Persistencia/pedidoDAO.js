import Pedido from "../Modelo/pedido.js";
import Cliente from "../Modelo/cliente.js";
import Produto from "../Modelo/produto.js";
import ItemPedido from "../Modelo/itemPedido.js";
import Categoria from "../Modelo/categoria.js";
import conectar from "./conexao.js";

export default class PedidoDAO {
    async gravar(pedido) {
        if (pedido instanceof Pedido) {
            const conexao = await conectar();

            await conexao.beginTransaction();
            try {
                const sql = "INSERT INTO pedido(cliente_codigo,data_pedido, total) VALUES(?,str_to_date(?,'%d/%m/%Y'),?)";
                const parametros = [pedido.cliente.codigo, pedido.data, pedido.total];
                const retorno = await conexao.execute(sql, parametros);
                pedido.codigo = retorno[0].insertId;
                
                const sql2 = "INSERT INTO pedido_produto(pedido_codigo, produto_codigo, quantidade, preco_unitario) VALUES(?,?,?,?)";
                for (const item of pedido.itens) {
                    const parametros2 = [pedido.codigo, item.produto.codigo, item.quantidade, item.precoUnitario];
                    await conexao.execute(sql2, parametros2);
                }

                await conexao.commit();
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }

    async excluir(pedido) {

    }

    async atualizar(pedido) {

    }

    async consultar(termoBusca) {
        const listaPedidos = [];


        if (!isNaN(termoBusca)) {
            const conexao = await conectar();
            const sql = ` SELECT p.codigo, p.cliente_codigo, p.data_pedido, p.total,
                            c.nome, c.endereco, c.telefone,
                            prod.prod_descricao, prod.prod_precoCusto, prod.prod_precoVenda,
                            prod.prod_dataValidade, prod.prod_qtdEstoque,
                            cat.cat_codigo, cat.cat_descricao,
                            i.produto_codigo, i.quantidade, i.preco_unitario, i.quantidade,
                            i.preco_unitario * i.quantidade as subtotal
                          FROM pedido as p
                            INNER JOIN cliente as c ON p.cliente_codigo = c.codigo
                            INNER JOIN pedido_produto as i ON i.pedido_codigo = p.codigo
                            INNER JOIN produto as prod ON prod.prod_codigo = i.produto_codigo
                            INNER JOIN categoria as cat ON prod.cat_codigo = cat.cat_codigo
                            WHERE p.codigo = ?;`

            const [registros, campos] = await conexao.execute(sql, [termoBusca]);
            if (registros.length > 0) {


                const cliente = new Cliente(registros[0].cliente_codigo, registros[0].nome, registros[0].telefone, registros[0].endereco);
                let listaItensPedidos = [];
                for (const registro of registros) {
                    const categoria = new Categoria(registro.codigo, registro.cat_descricao);
                    const produto = new Produto(registro.produto_codigo, registro.prod_descricao, registro.prod_precoCusto, registro.prod_precoVenda, registro.prod_dataValidade, registro.prod_qtdEstoque, categoria);
                    const itemPedido = new ItemPedido(produto, registro.quantidade, registro.preco_unitario, registro.subtotal);
                    listaItensPedidos.push(itemPedido);
                }
                const pedido = new Pedido(registros[0].codigo, cliente, registros[0].data, registros[0].total, listaItensPedidos);
                listaPedidos.push(pedido);
            }
        }


        return listaPedidos;
    }


}