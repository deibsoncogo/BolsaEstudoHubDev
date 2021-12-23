export interface IUpdateUser {
  id: string;
  name: string;
  birthDate: Date;
  cpf: number;
  email: string;
  passwordOld?: string;
  passwordNew: string;
}
