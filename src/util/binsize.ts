export const getBinSize = (lower: number, upper: number) => {
  const diff = Math.abs(upper - lower);
  let bins = 5;

  // Less than 2 minutes, bin size in seconds (min 1, max 120 bins)
  if (diff < 120) bins = 1;

  // Less than 12 hours, bin size in minutes (min 12, max 720 bins)
  if (diff < 12 * 60 * 60) bins = 2;

  // Less than a week, bin size in hours (min 12, max 168 bins)
  if (diff < 7 * 24 * 60 * 60) bins = 2;

  // Less than 2 years, bin size in days (min 7, max 732 bins)
  if (diff < 2 * 366 * 24 * 60 * 60) bins = 4;

  return { lower, upper, bins };
};

export const getDateHistogramQuery = (params : { start: number, end: number} | undefined) => {
  if (!params) return '';
  const { lower, upper, bins } = getBinSize(params.start, params.end);
  return `?lower=${lower}&upper=${upper}&bin=${bins}`;
};
