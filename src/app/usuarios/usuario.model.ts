export class Usuario {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public cpf: string,
        public ativo: boolean,
        public permissoes: boolean[],
        public permissoesIds?: string
        ) {}
}
