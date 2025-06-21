import { usePostFormData } from 'sefer-fetch';
import { SubtitlesFile } from 'types/data/SubtitlesFile';

export const usePostAudio = () => {
  const postFormData = usePostFormData();
  return async (file: File, lessonId: number) => {
    const data = new FormData();
    data.append('audio', file);
    data.append('lessonId', `${lessonId}`);
    const response = await postFormData('/lessons/audio-upload', data);
    return  JSON.parse(response.responseText) as SubtitlesFile;
  }
}


