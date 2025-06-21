import { ResponseError } from 'util/errors';
import { usePut } from 'sefer-fetch';

export const usePutCoursePrerequisites = () => {
  const put = usePut();
  return async (courses: number[], courseId: number) => {

    const { code } = await put(`/courses/${courseId}/prerequisites`, courses);
    switch (code) {
      case 202: return;
      case 404: throw new ResponseError(code, 'The course could not be found.');
      default:
        throw new ResponseError(code, 'A fatal error occurred while saving the prerequisites of the course. Please contact the developer');
    }
  };
}

