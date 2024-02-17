import Quarto from "../Modelo/quarto.js";

export default class QuartoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const numero = dados.numero;
            const andar = dados.andar;
            const status = dados.status;
            const tipoquarto = dados.tipoquarto;

            if (numero && andar && status && tipoquarto) {
                const quarto = new Quarto(0, numero, andar, status, 
                    tipoquarto
                );
                //resolver a promise
                quarto.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": quarto.codigo,
                        "mensagem": "quarto incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o quarto:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do quarto segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um quarto!"
            });
        }
    }

    /*
    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cliente_id = dados.cliente_id;
            const cpf = dados.cpf;
            const nome =  dados.nome;
            const telefone = dados.telefone;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const email = dados.email;
            const datanasc = dados.datanasc;
            const nacionalidade = dados.nacionalidade;
            const profissao = dados.profissao;
            const sexo = dados.sexo;
            const senha = dados.senha;




            if (cliente_id, cpf,nome, telefone,endereco, email,cidade, datanasc, nacionalidade, profissao, sexo, senha) {
                const cliente = new Cliente(0, cpf,nome, telefone,endereco, email,cidade, datanasc, nacionalidade, profissao, sexo, senha);
                cliente.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: 'Cliente atualizado com sucesso!'
                    });
     */

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "PUT" && requisicao.is('application/json')){            
            const dados = requisicao.body;
            const idquarto = dados.idquarto;
            const numero = dados.numero;
            const andar = dados.andar;
            const status = dados.status;
            const tipoquarto = dados.tipoquarto;

            if (idquarto && numero && andar && status && tipoquarto) {
                const quarto = new Quarto(idquarto, numero, andar, status, tipoquarto
                );
                //resolver a promise
                quarto.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "quarto atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o quarto:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do quarto segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um quarto!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.idquarto;
            if (codigo) {
                const quarto = new Quarto(codigo);
                //resolver a promise
                quarto.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "quarto excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o quarto:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do quarto!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um quarto!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const quarto = new Quarto();
            quarto.consultar(termo).then((listaquartos) => {
                resposta.json(
                    {
                        status: true,
                        listaquartos
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os quartos: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar quartos!"
            });
        }
    }
}