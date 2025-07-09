import { ResponseError } from 'util/errors';
import { Testimony } from 'types/data/resources/Testimony';
import { usePut } from 'sefer-fetch';

export const usePutTestimony = () => {
  const put = usePut<Testimony>();
  return async (testimony : Testimony) => {
    const { code } = await put(`/testimonies/${testimony.id}`, testimony);
    if (code !== 202) throw new ResponseError(code, 'Could not put the testimony to the server.');
    return testimony;
  };
}
