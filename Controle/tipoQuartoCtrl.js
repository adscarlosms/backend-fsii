//camada de interface da API que traduz HTTP
import TipoQuarto from "../Modelo/tipoQuarto.js";

export default class TipoQuartoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {
                const tipoQuarto = new TipoQuarto(0, descricao);
                //resolver a promise
                tipoQuarto.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": tipoQuarto.codigo,
                        "mensagem": "Tipo de Quarto incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o tipo do quarto:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição do tipo do quarto!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um tipo de quarto!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.idtpquarto;
            const descricao = dados.descricao;
            if (codigo && descricao) {
                const tipoQuarto = new TipoQuarto(codigo, descricao);
                //resolver a promise
                tipoQuarto.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Tipo de quarto atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o tipo de quarto:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um tipo de quarto!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.idtpquarto;
            if (codigo) {
                const tipoQuarto = new TipoQuarto(codigo);
                //resolver a promise
                tipoQuarto.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "tipo de quarto excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o tipo de quarto:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do tipo de quarto!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um tipo de quarto!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const tipoQuarto = new TipoQuarto();
            tipoQuarto.consultar(termo).then((listatipoQuartos)=>{
                resposta.json(
                    {
                        status:true,
                        listatipoQuartos
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter tipos de quartos: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar os tipos de quartos!"
            });
        }
    }
}