export default class ReservaCliente {
    #reserva_codigo;
    #quarto_codigo;
    
    constructor(reserva_codigo, quarto_codigo) {
        this.#reserva_codigo = reserva_codigo;
        this.#quarto_codigo = quarto_codigo;
    }

    // Métodos de acesso (get) e modificação (set)
    get reserva_codigo() {
        return this.#reserva_codigo;
    }

    set reserva_codigo(reserva_codigo) {
        this.#reserva_codigo = reserva_codigo;
    }



    get quarto_codigo() {
        return this.#quarto_codigo;
    }

    set quarto_codigo(quarto_codigo) {
        this.#quarto_codigo = quarto_codigo;
    }

    
    // JSON
    toJSON() {
        return {
            'reserva_codigo': this.#reserva_codigo,
            'quarto_codigo': this.#quarto_codigo,
            //'cliente_codigo': this.#cliente_codigo,
            //'quarto_codigo': this.#quarto_codigo
        };
    }
}

