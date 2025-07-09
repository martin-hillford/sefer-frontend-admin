import { Button, ButtonGroup, Property } from 'sefer/components';
import { Play, PlayBack, PlayPause, PlayStop } from 'sefer/icons';
import { useState } from 'react';
import { Lesson } from 'types/data/Lesson';
import { DataContext } from 'sefer/types/DataContext';
import { AudioTracks } from './AudioTracks';
import { DeleteAudioButton } from './DeleteButton';
import { UploadButton } from './UploadButton';
import { useFetchAudio } from './useFetchAudio';

export const AudioReference = (props : { context : DataContext<Lesson> }) => {
  const { context } = props;
  const { subtitlesFile, hasAudio } = useFetchAudio(context.data.id, context.data.audioReferenceId);
  const [state, setState] = useState<'stop' | 'play' | 'pause'>('stop');

  const onPlay = () => setState('play');
  const onPlayBack = () => { setState('stop'); setTimeout(() => setState('play'), 20); };
  const onPlayStop = () => setState('stop');
  const onPlayPause = () => setState('pause');
  const onPlayEnded = () => setState('stop');

  const isPlaying = state === 'play';

  return (
    <Property maxWidth={false} label="Audio">
      <ButtonGroup>
        <AudioTracks
          onPlayEnded={onPlayEnded}
          audio={subtitlesFile}
          state={state}
        />
        <Button
          disabled={!hasAudio || !isPlaying}
          onClick={onPlayBack}
          icon={<PlayBack size={20} />}
        />
        <Button
          disabled={!hasAudio}
          show={!isPlaying}
          onClick={onPlay}
          icon={<Play size={20} />}
        />
        <Button
          disabled={!hasAudio}
          show={isPlaying}
          onClick={onPlayPause}
          icon={<PlayPause size={20} />}
        />
        <Button
          disabled={!hasAudio || !isPlaying}
          onClick={onPlayStop}
          icon={<PlayStop size={20} />}
        />
        <UploadButton context={context} />
        <DeleteAudioButton context={context} />
      </ButtonGroup>
    </Property>
  );
};
