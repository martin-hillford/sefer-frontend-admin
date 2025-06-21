import { usePost } from 'sefer-fetch';
import { ResponseError } from 'util/errors';
import { Course } from 'types/data/Course';

export const useIsCoursePermalinkUnique = () => {
  const post = usePost<{ response : boolean }>()

  return async (course : Course) => {
    const { code, body } = await post('/courses/permalink', { id: course.id, permalink: course.permalink});
    if (code === 200) return body?.response === true;
    throw new ResponseError(code, 'Error while retrieving the uniqueness of the permalink of the course .');
  };
}
