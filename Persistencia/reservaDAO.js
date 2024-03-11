import Reserva from "../Modelo/reserva.js";
import Cliente from "../Modelo/cliente.js";
import Quarto from "../Modelo/quarto.js";
import Reserva_Cliente from "../Modelo/reservaCliente.js";
import Tipo_Quarto from "../Modelo/tipoQuarto.js";
import conectar from "./conexao.js";

export default class ReservaDAO {
    async gravar(reserva) {
        if (reserva instanceof Reserva) {
            const conexao = await conectar();

            await conexao.beginTransaction();
            try {
                const sql = "INSERT INTO reserva(codigo,data_inicio,data_fim,cliente_codigo) VALUES(?,str_to_date(?,'%d/%m/%Y'),str_to_date(?,'%d/%m/%Y'),?)";
                const parametros = [reserva.codigo, reserva.data_inicio, reserva.data_fim, reserva.cliente.codigo];
                const retorno = await conexao.execute(sql, parametros);
                reserva.codigo = retorno[0].insertId;

                const sql2 = "INSERT INTO reserva_cliente(reserva_codigo, quarto_codigo) VALUES(?,?)";                  
                for (const item of reserva.quartos) {
                    let parametros2 = [reserva.codigo, item.quarto_codigo.idquarto];
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit();
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }

    async excluir(reserva) {
       //Para implementar (onCascade)   
    }

    async atualizar(reserva) {

    }

    async consultar(termoBusca) {
        const listareservas = [];


        if (!isNaN(termoBusca)) {
            const conexao = await conectar();
            const sql = ` SELECT r.codigo, r.data_inicio, r.data_fim, 
            r.cliente_codigo, q.idquarto, q.numero, q.andar, q.status, 
            q.idtpquarto, c.nome, c.endereco, c.telefone, t.idtpquarto, 
            t.descricao,rc.reserva_codigo, rc.quarto_codigo 
            FROM reserva as r 
            INNER JOIN cliente as c 
            ON r.cliente_codigo = c.codigo 
            INNER JOIN reserva_cliente as rc 
            ON rc.reserva_codigo = r.codigo 
            INNER JOIN quarto as q 
            ON q.idquarto = rc.quarto_codigo 
            INNER JOIN tipo_quarto as t 
            ON t.idtpquarto = q.idtpquarto 
            WHERE r.codigo = ?;`

            const [registros, campos] = await conexao.execute(sql, [termoBusca]);
            if (registros.length > 0) {


                const cliente = new Cliente(registros[0].cliente_codigo, registros[0].nome, registros[0].telefone, registros[0].endereco);
                let listaItensreservas = [];
                for (const registro of registros) {
                    const tipoquarto = new Tipo_Quarto(registro.idtpquarto, registro.descricao);
                    const quarto = new Quarto(registro.idquarto, registro.numero, registro.andar, registro.status, tipoquarto);
                    const reserva_cliente = new Reserva_Cliente(quarto, registro.reserva_codigo, registro.cliente_codigo);
                    listaItensreservas.push(reserva_cliente);
                }
                const reserva = new Reserva(registros[0].codigo, cliente, registros[0].data_inicio, registros[0].data_fim, listaItensreservas);
                listareservas.push(reserva);
            }
        }


        return listareservas;
    }


}