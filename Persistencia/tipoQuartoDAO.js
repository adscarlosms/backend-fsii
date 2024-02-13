import TipoQuarto from "../Modelo/tipoQuarto.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class TipoQuartoDAO{
    async gravar(tipoQuarto){
        if (tipoQuarto instanceof TipoQuarto){
            const sql = "INSERT INTO tipo_quarto(descricao) VALUES(?)"; 
            const parametros = [tipoQuarto.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            tipoQuarto.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(tipoQuarto){
        if (tipoQuarto instanceof TipoQuarto){
            const sql = "UPDATE tipo_quarto SET descricao = ? WHERE idtpquarto = ?"; 
            const parametros = [tipoQuarto.descricao, tipoQuarto.idtpquarto];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(tipoQuarto){
        if (tipoQuarto instanceof TipoQuarto){
            const sql = "DELETE FROM tipo_quarto WHERE idtpquarto = ?"; 
            const parametros = [tipoQuarto.idtpquarto];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da tipoQuarto
            sql='SELECT * FROM tipo_quarto WHERE idtpquarto = ? order by descricao';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM tipo_quarto WHERE descricao like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listatipoQuartos = [];
        for (const registro of registros){
            const tipoQuarto = new TipoQuarto(registro.idtpquarto,registro.descricao);
            listatipoQuartos.push(tipoQuarto);
        }
        return listatipoQuartos;
    }
}