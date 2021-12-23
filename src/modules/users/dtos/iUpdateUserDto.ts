export interface IUpdateUser {
  id: string;
  name: string;
  cpf: number;
  email: string;
  passwordOld?: string;
  passwordNew: string;
}
