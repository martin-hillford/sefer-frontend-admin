import { Course } from 'types/data/Course';
import { Stage } from 'types/data/Stages';
import { User } from 'types/data/users/User';
import { DataContext } from 'sefer/types/DataContext';
import { useGet } from 'sefer-fetch';
import { Mentor } from 'types/data/users/Mentor';
import { useFetchStudents } from 'hooks/useFetchStudents';
import { useFetchCourses } from 'hooks/useFetchCourses';
import { useEnrollmentContext } from './useEnrollmentContext';
import { usePostEnrollment } from './usePostEnrollment';

const enrollment = { isCompleted: false, onPaper: false } as Enrollment;

export const useEnrollmentCreation = () => {
  const context = useEnrollmentContext(enrollment)
  const postEnrollment = usePostEnrollment();

  const { students } = useFetchStudents()
  const allCourses = useFetchCourses().courses;
  const courses = allCourses?.filter(c => c.stage === Stage.Published);
  const mentors =  useGet<Mentor[]>('/users/mentors');

  const onSave = async () => {
    if (!context) return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enrollment = { ...context.data } as any;
    if (enrollment.completionDate) enrollment.completionDate = new Date(enrollment.completionDate * 1000);
    return await postEnrollment(enrollment);
  };

  return { students, courses, mentors, context, onSave };
};

export type Enrollment = {
  studentId : number | undefined,
  mentorId : number | undefined,
  courseId : number | undefined,
  isCompleted : boolean,
  grade : number | null
  completionDate : number | null,
  onPaper : boolean
}

export type FormProps = {
  students : User[],
  mentors : User[],
  courses : Course[],
  context : DataContext<Enrollment>
  onSave : () => Promise<boolean>
}
