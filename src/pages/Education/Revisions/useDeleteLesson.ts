import { ResponseError } from 'util/errors';
import { useDelete } from 'sefer-fetch';

export const useDeleteLesson = () => {
  const del = useDelete();
  return async (lessonId: number | undefined | string) => {
    const { code } = await del(`/courses/lessons/${lessonId}`, {});
    if (code === 202) return;
    throw new ResponseError(code, 'A fatal error occurred while removing the lesson.');
  };
}
