import { useDelete } from 'sefer-fetch';

export const useDeleteAudio = () => {
  const del = useDelete();
  return (lessonId : number) => del(`/lessons/${lessonId}/audio`, {});
}
