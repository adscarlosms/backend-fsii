import Quarto from '../Modelo/quarto.js';
import conectar from './conexao.js';
import TipoQuarto from '../Modelo/tipoQuarto.js';

export default class QuartoDAO {

    async gravar(quarto) {
        if (quarto instanceof Quarto) {
            const sql = `INSERT INTO quarto(	
                numero,	
                andar,	
                status,	
                idtpquarto) VALUES(?,?,?,?)`;
            const parametros = [quarto.numero, quarto.andar, quarto.status, quarto.tipoquarto.idtpquarto];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            quarto.idquarto = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(quarto) {
        if (quarto instanceof Quarto) {
            const sql = `UPDATE quarto SET numero = ?, andar = ?, status = ?, idtpquarto = ? WHERE idquarto = ?`;
            const parametros = [quarto.numero, quarto.andar, quarto.status, quarto.tipoquarto.idtpquarto, quarto.idquarto];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(quarto) {
        if (quarto instanceof Quarto) {
            const sql = `DELETE FROM quarto WHERE idquarto = ?`;
            const parametros = [quarto.idquarto];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaquartos = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do quarto
            const sql = `SELECT quarto.*, tipo_quarto.descricao
            AS tipo_quarto_descricao 
            FROM quarto 
            INNER JOIN tipo_quarto 
            ON tipo_quarto.idtpquarto = quarto.idtpquarto
            WHERE quarto.idquarto = ?;               
            `;
            const parametros=[termo];
            const [registros] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                 
                const tipoquarto = new TipoQuarto(registro.idtpquarto, registro.descricao);

                const  quarto = new Quarto(
                    registro.idquarto, 
                    registro.numero,
                    registro.andar,
                    registro.status,
                    tipoquarto
                   
                )
                listaquartos.push(quarto);
            }
        }
        else
        {
            //consulta pela descrição do quarto
            const sql = `SELECT q.idquarto, q.numero, q.andar, q.status, 
            t.idtpquarto, t.descricao
            FROM quarto q 
            INNER JOIN tipo_quarto t 
            ON q.idtpquarto = t.idtpquarto 
            ORDER BY t.descricao;               
            `;
         
            const [registros] = await conexao.execute(sql);
            for (const registro of registros){
                 
                const tipoquarto = new TipoQuarto(registro.idtpquarto, registro.descricao);

                const  quarto = new Quarto(
                    registro.idquarto, 
                    registro.numero,
                    registro.andar,
                    registro.status,
                    tipoquarto
                   
                )
                listaquartos.push(quarto);
            }
        }

        return listaquartos;
    }
}