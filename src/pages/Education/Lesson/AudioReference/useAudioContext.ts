import { useState } from 'react';

export const useAudioContext = () => {
  const [audioContext] = useState(getAudioContext());
  return audioContext;
};

const getAudioContext = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  return new AudioContext();
};
