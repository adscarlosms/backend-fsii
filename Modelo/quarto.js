import QuartoDAO from "../Persistencia/quartoDAO.js";

export default class Quarto{

    #idquarto	
    #numero	
    #andar	
    #status	
    #tipoquarto	


    constructor(idquarto=0, numero=0, andar=0, status="", tipoquarto={}){
        this.#idquarto = idquarto;
        this.#numero = numero;
        this.#andar = andar;
        this.#status = status;
        this.#tipoquarto = tipoquarto;
    }

    get idquarto(){
        return this.#idquarto;
    }

    set idquarto(novoidquarto){
        this.#idquarto = novoidquarto;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novonumero){
        this.#numero = novonumero;
    }

    get andar(){
        return this.#andar;
    }

    set andar(novoandar){
        this.#andar = novoandar;
    }

    get status(){
        return this.#status;
    }

    set status(novostatus){
        this.#status = novostatus;
    }
     
    get tipoquarto(){
        return this.#tipoquarto;
    }

    set tipoquarto(novotipoquarto){
        this.#tipoquarto = novotipoquarto;
    }
    
    toJSON(){
        return {
            idquarto:this.#idquarto,
            numero:this.#numero,
            andar:this.#andar,
            status:this.#status,
            tipoquarto:this.#tipoquarto
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const quartoDAO = new QuartoDAO();
        await quartoDAO.gravar(this);
     }
 
     async excluir(){
        const quartoDAO = new QuartoDAO();
        await quartoDAO.excluir(this);
     }
 
     async atualizar(){
        const quartoDAO = new QuartoDAO();
        await quartoDAO.atualizar(this);
     }
 
     async consultar(termo){
        const quartoDAO = new QuartoDAO();
        return await quartoDAO.consultar(termo);
     }

}