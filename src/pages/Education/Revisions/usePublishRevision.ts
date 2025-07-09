import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePublishRevision = () => {
  const post = usePost<unknown>();
  return async (revisionId: number) => {
    const { code } = await post(`/courses/revision/${revisionId}/publish`, {});
    switch (code) {
      case 202:return true;
      case 412: return false;
      case 404: throw new ResponseError(code, 'Could not find the revision to publish.');
      default: throw new ResponseError(code, 'A fatal error occurred while publishing the revision for this lesson.');
    }
  };
}
