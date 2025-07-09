import { ResponseError } from 'util/errors';
import { usePut } from 'sefer-fetch';

export const usePutCourseMentors = () => {
  const put = usePut();
  return async (courseId: number, mentors: number[]) => {
    const { code } = await put(`/courses/${courseId}/mentors`, { mentors });
    switch (code) {
      case 204: return;
      case 404: throw new ResponseError(code, 'The course could not be found.');
      default:
        throw new ResponseError(code, 'A fatal error occurred while saving the mentors of the course. Please contact the developer');
    }
  };
}
