import { useGetAsync } from 'sefer-fetch';
import { useEffect, useState } from 'react';
import { SubtitlesFile } from 'types/data/SubtitlesFile';

export const useFetchAudio = (lessonId: number, audioReferenceId: string | null | undefined) => {
  const [subtitlesFile, setSubtitlesFile] = useState<SubtitlesFile | undefined>();
  const get = useGetAsync<SubtitlesFile>();

  useEffect(() => {
    if (!audioReferenceId)  return setSubtitlesFile(undefined);
    const promise = get(`/lessons/${lessonId}/audio?audioReferenceId=${audioReferenceId}`);
    promise.then(response => {
      if (response.ok) setSubtitlesFile(response.body);
    })
  }, [audioReferenceId, lessonId]);

  const hasAudio = !!audioReferenceId;
  return { subtitlesFile, hasAudio };
};
