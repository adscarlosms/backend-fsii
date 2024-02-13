import tipoQuartoDAO from "../Persistencia/tipoQuartoDAO.js";
//não esqueça do .js no final da importação

export default class TipoQuarto {
    //definição dos atributos privados
    #idtpquarto;
    #descricao;

    constructor(idtpquarto=0, descricao=''){
        this.#idtpquarto=idtpquarto;
        this.#descricao=descricao;
    }

    //métodos de acesso públicos

    get idtpquarto(){
        return this.#idtpquarto;
    }

    set idtpquarto(novoidtpquarto){
        this.#idtpquarto = novoidtpquarto;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            idtpquarto:this.#idtpquarto,
            descricao:this.#descricao
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const tpQuarto = new tipoQuartoDAO();
        await tpQuarto.gravar(this);
    }

    async excluir(){
        const tpQuarto = new tipoQuartoDAO();
        await tpQuarto.excluir(this);
    }

    async atualizar(){
        const tpQuarto = new tipoQuartoDAO();
        await tpQuarto.atualizar(this);

    }

    async consultar(parametro){
        const tpQuarto = new tipoQuartoDAO();
        return await tpQuarto.consultar(parametro);
    }
}