import { ResponseError } from 'util/errors';
import { useDelete } from 'sefer-fetch';

export const useDeleteCourse = () => {
  const del = useDelete();
  return async (courseId: number ) => {
    const { code } = await del(`/courses/${courseId}`, null);
    if (code === 204) return true;
    throw new ResponseError(code, 'A fatal error occurred while removing the course.');
  };
}

