import CategoryItemWeekly from 'types/data/stats/CategoryItemWeekly';

export default (data: CategoryItemWeekly[] | undefined | null) => {
  if (!data) return data;
  const categories = [] as string[];
  const labels = [] as string[];
  const store = {} as { [key: string]: { [key: string]: number } }

  data.forEach(item => {
    const xValue = `${item.year}-${item.week}`;
    if (!categories.includes(item.name)) categories.push(item.name);
    if (!labels.includes(xValue)) labels.push(xValue);

    if (!store[item.name]) store[item.name] = { } as { [key: string]: number };
    store[item.name][xValue] = Math.round(100 * item.percentage) / 100;
  });

  const series = categories.map(name => {
    const values = labels.map(xValue => store[name][xValue] ?? 0);
    const sum = values.reduce((a, b) => a + b, 0);
    return { data: values, name, sum };
  });

  series.sort((a, b) => b.sum - a.sum);

  return { categories: series.map(s => s.name), series, labels };
};
