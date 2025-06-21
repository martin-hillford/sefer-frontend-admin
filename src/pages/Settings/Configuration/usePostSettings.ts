import { Configuration } from 'types/data/settings/Configuration';
import { ResponseError } from 'util/errors';
import { usePost } from 'sefer-fetch';

export const usePostSettings = () => {
  const post = usePost();
  return async (config : Configuration) => {
    if (!config.isLessonSubmissionsLimited) config.maxLessonSubmissionsPerDay = null;
    const { code } = await post('/settings', prepare(config));
    if (code !== 202) throw new ResponseError(code, 'Could not save the configuration to the server.');
    return config;
  };
}

const prepare = (config : Configuration) => {
  if (config.relativeAvailabilityFactor > 1) {
    config.relativeAvailabilityFactor /= 100;
  }
  config.relativeAgeFactor = 1 - config.relativeAvailabilityFactor;
  return config;
};
