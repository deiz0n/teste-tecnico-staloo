export class ExamModel {
  constructor(
    public readonly id: string,
    public score: number,
    public studentId: string,
  ) {}
}
