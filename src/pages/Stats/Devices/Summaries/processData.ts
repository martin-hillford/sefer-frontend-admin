import CategoryItem from 'types/data/stats/CategoryItem';

export default (data: CategoryItem[]) => {
  const sorted = sort(data);
  if (sorted.length < 8) return map(sorted);

  const head = sorted.slice(0, 7);
  const tail = sorted.slice(8);

  const count = tail.reduce((a, b) => a + b.count, 0);
  const percentage = tail.reduce((a, b) => a + b.percentage, 0);
  head.push({ name: 'Other', count, percentage });

  return map(sort(head));
};

const sort = (data: CategoryItem[]) => data.sort((a, b) => b.percentage - a.percentage);
const map = (data: CategoryItem[]) => data.map(item => ({ ...item, value: Math.round(item.percentage * 100) / 100 }));