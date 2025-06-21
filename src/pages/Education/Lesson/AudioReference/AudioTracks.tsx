import { useEffect, useState } from 'react';
import { SubtitlesFile } from 'types/data/SubtitlesFile';

interface Props {
    state: 'stop' | 'play' | 'pause'
    audio: SubtitlesFile | undefined,
    onPlayEnded: () => void
}

export const AudioTracks = (props : Props) => {
  const { state, audio, onPlayEnded } = props;
  const [playing, setPlaying] = useState(0);

  useEffect(() => {
    const audioElement = getAudioElement(audio, playing);
    if (!audioElement) return;

    switch (state) {
      case 'stop':
        audioElement.pause();
        audioElement.currentTime = 0;
        setPlaying(0);
        break;
      case 'pause':
        audioElement.pause();
        break;
      case 'play':
        audioElement.play().then();
        break;
    }
  }, [state, playing, audio]);

  const onEnded = () => {
    const audioElement = getAudioElement(audio, playing);
    if (!audioElement || !audio) return;

    audioElement.currentTime = 0;
    if (playing === audio.sequences.length - 1) onPlayEnded();
    else setPlaying(p => p + 1);
  };

  if (!audio) return null;
  return (
    <>
      {audio.sequences.map((track, index) => (
        <audio
          src={track.audioUrl}
          crossOrigin="anonymous"
          id={track.audioFile}
          key={track.audioFile}
          preload={index <= playing + 1 ? 'auto' : 'none'}
          onEnded={onEnded}
        />
      ))}
    </>
  );
};

const getAudioElement = (subtitlesFile : SubtitlesFile | undefined, playing: number) => {
  if (subtitlesFile === undefined) return null;
  const sequence = subtitlesFile.sequences[playing];
  const audioElement = document.getElementById(sequence.audioFile);
  return audioElement !== null ? audioElement as HTMLAudioElement : null;
};
