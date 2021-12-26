/* eslint-disable no-debugger */
export class AppError { // classe que vai criar uma tratativa especial para os erros
  public readonly message: string; // cria uma variável publica somente leitura

  public readonly statusCode: number; // cria uma variável publica somente leitura

  constructor(message: string, statusCode = 400) { // criar a mensagem de erro
    const isStringMessage = typeof message === "string";

    this.message = isStringMessage ? message : message[0]; // define a mensagem
    this.statusCode = statusCode; // define o código do erro
  }
}
