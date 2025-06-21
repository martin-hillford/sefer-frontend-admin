import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePublishCurriculumRevision = () => {
  const post = usePost();
  return async (revisionId: number | undefined) => {
    if (!revisionId) return false;
    const { code } = await post(`/courses/curricula/revision/${revisionId}/publish`, {});
    switch (code) {
      case 202: return true;
      case 412: return false;
      default: throw new ResponseError(code, 'Could not publish the revision of the curriculum');
    }
  };
}
