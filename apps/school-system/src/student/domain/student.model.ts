export class StudentModel {
  constructor(
    public readonly id: string,
    public name: string,
    public cpf: string,
    public endereco: string,
    public dataNascimento: Date,
  ) {}
}
