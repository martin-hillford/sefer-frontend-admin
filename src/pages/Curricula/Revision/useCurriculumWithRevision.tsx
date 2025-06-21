import { CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { useGet, usePut } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

export const useCurriculumWithRevision = (id : number) => {
  const curriculum = useGet<CurriculumWithRevisions>(`/courses/curricula/${id}/editing-revision`);
  const putCurriculumRevision = usePutCurriculumRevision();

  const save = async (years : number | null) => {
    if(!curriculum) return false;
    const args = { years: years ?? 0, revisionId: curriculum.editingRevision.id };
    return await putCurriculumRevision(args);
  };

  return { curriculum, save };
};

const usePutCurriculumRevision = () => {
  const put = usePut();
  return async (args : { revisionId : number, years : number }) => {
    const { code } = await put(`/courses/curricula/revision/${args.revisionId}`, args);
    if (code === 202) return true;
    throw new ResponseError(code, 'Could not save the revision of the curriculum to the server, please try again, if the problem persists please contact the developer.');
  };
}

