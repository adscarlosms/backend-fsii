import ReservaDAO from "../Persistencia/reservaDAO.js";
export default class reserva {
    #codigo;
    #cliente
    #data_inicio;
    #data_fim;
    #quartos;
    

    constructor(codigo, cliente,data_inicio, data_fim, quartos) {
        this.#codigo = codigo;
        this.#cliente = cliente;
        this.#data_inicio = data_inicio;
        this.#data_fim = data_fim;
        this.#quartos = quartos;
    }

    
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    get cliente() {
        return this.#cliente;
    }

    set cliente(novocliente) {
        this.#cliente = novocliente;
    }

    // Código do Cliente
    get data_inicio() {
        return this.#data_inicio;
    }

    set data_inicio(novaData) {
        this.#data_inicio = novaData;
    }

    get data_fim() {
        return this.#data_fim;
    }

    set data_fim(novaData) {
        this.#data_fim = novaData;
    }

    get quartos() {
        return this.#quartos;
    }

    set quartos(novosQuartos) {
        this.#quartos = novosQuartos;
    }
    toJSON() {
        return {
            'codigo': this.#codigo,
            'cliente': this.#cliente,
            'data_inicio': this.#data_inicio,
            'data_fim': this.#data_fim,
            'quartosReservados': this.#quartos
        };
    }

    async gravar() {
        const reservaDAO = new ReservaDAO();
        this.codigo = await reservaDAO.gravar(this);
    }

    async atualizar() {
        // const reservaDAO = new reservaDAO();
        // await reservaDAO.atualizar(this);
    }

    async excluir() {
        // const reservaDAO = new reservaDAO();
        // await reservaDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const reservaDAO = new ReservaDAO();
        const listareservas = await reservaDAO.consultar(termoBusca);
        return listareservas;
    }
    
}
