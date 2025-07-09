import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { useDelete, useGetWithRefresh } from 'sefer-fetch';
import { ResponseError } from 'util/errors';

export const useCurricula = () => {
  const del = useDelete();
  const [curricula, reload] = useGetWithRefresh<CurriculumBase[]>('/courses/curricula');

  const onDelete = async (curriculum : CurriculumBase) => {
    if (curriculum.id < 1) return false;
    const { code } = await del(`/courses/curricula/${curriculum.id}`, {});
    if (code !== 204) throw new ResponseError(code, 'Could not delete the curriculum');
    return true;
  };

  return { curricula, reload, onDelete };
};
