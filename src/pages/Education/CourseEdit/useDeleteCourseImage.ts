import { useDelete } from 'sefer-fetch';

export const useDeleteCourseImage = () => {
  const del = useDelete();
  return async (courseId : number, name: string ) => {
    // eslint-disable-next-line no-empty
    try { await del(`/courses/${courseId}/files/${name}`, { }); } catch { }
  };
}
