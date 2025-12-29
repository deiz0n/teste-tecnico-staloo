export class ExamDto {
  constructor(
    public readonly id: string,
    public score: number,
    public date: Date,
  ) {}
}
