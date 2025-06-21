import { usePost } from 'sefer-fetch';
import { ResponseError } from 'util/errors';
import { Course } from 'types/data/Course';

export const useIsCourseNameUnique = () => {
  const post = usePost<{ response : boolean }>()

  return async (course : Course) => {
    const { code, body } = await post('/courses/name', { id: course.id, name: course.name});
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the name of the course .');
  };
}
