import { usePostFormData } from 'sefer-fetch';

export type UploadPayload = {
  path : string,
  files : File[]
  onProgress : (progress : number) => void;
}

export const useUploadFile = () => {
  const post = usePostFormData();
  return async (payload: UploadPayload) => {
    const tasks = [] as Promise<XMLHttpRequest>[];
    const progress = new Array<number>(payload.files.length);

    const onProgress = () => {
      const total = progress.reduce((a, b) => a + b) / payload.files.length;
      payload.onProgress(total);
    };

    for (let index = 0; index < payload.files.length; index++) {
      const data = new FormData();
      data.set('file', payload.files[index], payload.files[index].name);
      data.set('path', payload.path);

      const onLocalProgress = (value?: number) => {
        if (value === undefined) return;
        progress[index] = value;
        onProgress();
      };

      tasks.push(post('/content/files', data, onLocalProgress));
    }

    await Promise.all(tasks);
  }
}
