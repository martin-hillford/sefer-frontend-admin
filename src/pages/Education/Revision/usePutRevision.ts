import { Revision } from '../../../types/data/Revision';
import { ResponseError } from 'util/errors';
import { usePut } from 'sefer-fetch';

export const usePutRevision = () => {
  const put = usePut();
  return async (revision : Revision) => {
    const { code } = await put(`/courses/revision/${revision.id}`, revision);
    if(code === 200 || code === 202) return;
    throw new ResponseError(code, 'A fatal error occurred while saving the revision of the course. Please contact the developer');
  }
};
