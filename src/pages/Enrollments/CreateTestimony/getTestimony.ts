import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { Testimony } from 'types/data/enrollments/Testimony';

export const getTestimony = (result : SurveyResult) => ({
  courseId: result.course.id,
  studentId: result.student.id,
  surveyResultId: result.id,
  content: result.text,
  name: result.student.name,
  isAnonymous: false,
} as Testimony);
