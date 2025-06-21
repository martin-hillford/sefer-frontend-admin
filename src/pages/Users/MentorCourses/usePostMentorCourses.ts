import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostMentorCourse = () => {
  const post = usePost();
  return async (args: { mentorId: number, courses: number[] }) => {
    const { mentorId } = args;
    const { code } = await post(`/users/mentors/${mentorId}/courses`, args);

    switch (code) {
      case 200: return;
      case 204: return;
      case 400: throw new ResponseError(code, courseNotFound);
      case 404: throw new ResponseError(code, mentorNotFound);
      default: throw new ResponseError(code, defaultError);
    }
  };
}

const courseNotFound = "Could not save the courses of the mentor because one or more of provided courses don't exists.";
const mentorNotFound = 'Could not save the courses of the mentor because the mentor could not be found or the provided id is from a user which is not a mentor.';
const defaultError = 'Could not save the courses of the mentor';

