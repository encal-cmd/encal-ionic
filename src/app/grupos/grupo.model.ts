export class Grupo {
    constructor(
        public id: string,
        public nome: string,
        public usuariosPermitidos: string,
        public ultimaMsg?: string
        ) {}
}
