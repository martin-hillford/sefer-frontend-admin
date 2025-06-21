import { CourseWithRevisions } from 'types/data/CourseWithRevisions';
import { useGetWithRefresh } from 'sefer-fetch';

export const useGetCourseWithEditingRevision = (courseId: number) =>
  useGetWithRefresh<CourseWithRevisions>(`/courses/${courseId}/editing-revision`);
