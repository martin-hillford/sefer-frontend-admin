import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostCloseRevision = () => {
  const post = usePost();
  return async (revisionId: number | undefined) => {
    if(revisionId === undefined) return false;
    const { code } = await post(`/courses/revision/${revisionId}/close`, {});
    switch (code) {
      case 202: return true;
      case 412: return false;
      case 404: throw new ResponseError(code, 'Could not find the revision to close.');
      default: throw new ResponseError(code, 'A fatal error occurred while closing the published revision for this lesson.');
    }
  };
}
