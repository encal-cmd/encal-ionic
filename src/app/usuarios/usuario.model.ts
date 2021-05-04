export class Usuario {
    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public cpf: string,
        public ativo: boolean,
        public permissoes?: any,
        public grupoUsuIds?: string,
        public admin?: boolean
        ) {}

    temPermissao(permissao: string) {
        if(this.admin) { return true }
        const perm = this.permissoes.find((n: string) => n == permissao)
        if (perm != undefined) { return true }
    }
}
