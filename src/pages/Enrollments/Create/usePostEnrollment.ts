import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';
import { Enrollment } from './useEnrollmentCreation';

export const usePostEnrollment = () => {
  const post = usePost();
  return async (enrollment : Enrollment) => {
    const { code } = await post('/admin/enrollments', enrollment);
    if (code === 201) return true;
    throw new ResponseError(code, 'Could not create an new enrollment, please contact the developer.');
  };
};
