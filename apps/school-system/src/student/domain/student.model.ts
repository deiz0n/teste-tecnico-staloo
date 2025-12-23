export class StudentModel {
  constructor(
    public readonly id: string,
    public name: string,
    public cpf: string,
    public address: string,
    public dateBirth: Date,
  ) {}
}
