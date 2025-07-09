import { Lesson } from 'types/data/Lesson';
import { useGet } from 'sefer-fetch';

export const useFetchLesson = (lessonId : number) => {
  const lesson = useGet<Lesson>(`/courses/lessons/${lessonId}`);
  if (lesson === null) throw new Error('Could not fetch the lesson');
  return lesson;
};
