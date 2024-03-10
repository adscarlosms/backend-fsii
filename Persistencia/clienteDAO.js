import Cliente from "../Modelo/cliente.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class ClienteDAO{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const sql = "INSERT INTO cliente(nome,telefone,endereco) VALUES(?,?,?)"; 
            const parametros = [cliente.nome, cliente.telefone, cliente.endereco];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            cliente.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente){
            const sql = "UPDATE cliente SET nome = ?, telefone = ?, endereco = ? WHERE codigo = ?"; 
            const parametros = [cliente.nome, cliente.telefone, cliente.endereco, cliente.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const sql = "DELETE FROM cliente WHERE codigo = ?"; 
            const parametros = [cliente.codigo];
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
            //consultar pelo código da cliente
            sql='SELECT * FROM cliente WHERE codigo = ? order by nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM cliente";
            //parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaclientes = [];
        for (const registro of registros){
            const cliente = new Cliente(registro.codigo, registro.nome, registro.telefone, registro.endereco);
            listaclientes.push(cliente);
        }
        return listaclientes;
    }
}