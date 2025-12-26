export abstract class ExamRepositoryPort<T> {
  abstract getStudentReport(studentId: string): Promise<T>;
}
