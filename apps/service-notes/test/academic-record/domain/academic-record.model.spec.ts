import { AcademicRecordModel } from '../../../academic-record/domain/academic-record.model';
import { ExamModel } from '../../../exam/domain/exam.model';
import { SubjectModel } from '../../../subject/domain/subject.model';

describe('AcademicRecordModel', () => {
  const createMockExam = (score: number | string): ExamModel => {
    return { score: Number(score) } as unknown as ExamModel;
  };

  const createMockSubject = (exams: ExamModel[] = []): SubjectModel => {
    return { exams } as unknown as SubjectModel;
  };

  describe('Constructor', () => {
    it('should initialize with default values when optional parameters are not provided', () => {
      const subject = createMockSubject([]);
      const record = new AcademicRecordModel('rec-1', 'student-1', subject);

      expect(record.exams).toEqual([]);
      expect(record.finalGrade).toBe(0);
      expect(record.passed).toBe(false);
    });
  });

  describe('updatePerformance', () => {
    it('should calculate final grade correctly and set passed to true when average >= 7.0', () => {
      const exams = [createMockExam(8), createMockExam(6)];
      const subject = createMockSubject(exams);
      const record = new AcademicRecordModel('rec-1', 'student-1', subject);

      record.updatePerformance();

      expect(record.finalGrade).toBe(7.0);
      expect(record.passed).toBe(true);
    });

    it('should calculate final grade correctly and set passed to false when average < 7.0', () => {
      const exams = [createMockExam(5), createMockExam(6)];
      const subject = createMockSubject(exams);
      const record = new AcademicRecordModel('rec-1', 'student-1', subject);

      record.updatePerformance();

      expect(record.finalGrade).toBe(5.5);
      expect(record.passed).toBe(false);
    });

    it('should handle rounding to 2 decimal places correctly', () => {
      const exams = [createMockExam(10), createMockExam(10), createMockExam(8)];
      const subject = createMockSubject(exams);
      const record = new AcademicRecordModel('rec-1', 'student-1', subject);

      record.updatePerformance();

      expect(record.finalGrade).toBe(9.33);
    });

    it('should set finalGrade to 0 and passed to false if there are no exams', () => {
      const subject = createMockSubject([]);
      const record = new AcademicRecordModel('rec-1', 'student-1', subject);

      record.updatePerformance();

      expect(record.finalGrade).toBe(0);
      expect(record.passed).toBe(false);
    });

    it('should prioritize exams from SubjectModel if present', () => {
      const subjectExams = [createMockExam(10)];
      const localExams = [createMockExam(2)];

      const subject = createMockSubject(subjectExams);
      const record = new AcademicRecordModel(
        'rec-1',
        'student-1',
        subject,
        localExams,
      );

      record.updatePerformance();

      expect(record.finalGrade).toBe(10.0);
    });

    it('should fallback to this.exams if SubjectModel exams are empty', () => {
      const subjectExams = [];
      const localExams = [createMockExam(8.5)];

      const subject = createMockSubject(subjectExams);
      const record = new AcademicRecordModel(
        'rec-1',
        'student-1',
        subject,
        localExams,
      );

      record.updatePerformance();

      expect(record.finalGrade).toBe(8.5);
    });

    it('should handle string scores by converting them to numbers', () => {
      const exams = [createMockExam('7.5'), createMockExam('8.5')];
      const subject = createMockSubject(exams);
      const record = new AcademicRecordModel('rec-1', 'student-1', subject);

      record.updatePerformance();

      expect(record.finalGrade).toBe(8.0);
    });
  });
});
