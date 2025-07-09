export const getStartRange = () => ({
  start: Math.round(new Date(new Date().getFullYear(), 0, 1).getTime() / 1000),
  end: Math.round(new Date().getTime() / 1000),
});