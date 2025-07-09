import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostSeriesIsPublic = () => {
  const post = usePost();
  return async (seriesId: number, setPublic: boolean) => {
    const method = setPublic ? 'publish' : 'close';
    const verb = setPublic ? 'published' : 'closed';

    const { code } = await post(`/series/${seriesId}/${method}`, {});
    switch (code) {
      case 412: return false;
      case 202: return true;
      default:
        throw new ResponseError(code, `Could set the series to be ${verb}, please try again, if the problem persists please contact the developer.`);
    }
  };
}
