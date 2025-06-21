import { Panel } from 'sefer/components';
import { BarChart } from 'components';
import { Stats } from 'sefer/icons';
import { Colors } from 'sefer/types/Colors';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Bin {
    interval: number,
    quantity: number
}

export const RequestsPerHourOfWeek = () => {
  const hours = useFetchHoursOfTheDay();
  const days = useFetchDaysOfTheWeek();
  const terms = useLocalization(localization);

  return (
    <>
      <Panel icon={<Stats size={20} />} title={terms.relativeCallsPerDay}>
        <BarChart height={300} unit={terms.day} name={terms.calls} data={days} color={Colors.Orange} />
      </Panel>
      <Panel icon={<Stats size={20} />} title={terms.relativeCallsPerHour}>
        <BarChart height={300} unit={terms.hour} name={terms.calls} data={hours} color={Colors.Blue} />
      </Panel>
    </>
  );
};

const useFetchDaysOfTheWeek = () => {
  const bins = useFetchStatistics<Bin[]>('/api-requests/day-of-the-week');
  if(!bins) return bins;
  // Make the bins relative by calculating the percentage
  const sum = bins.reduce((prev, cur) => prev + cur.quantity, 0);
  const data = bins.map(b => ({ key: b.interval, value: b.quantity / sum * 100 }));

  // Here is the thing, in the data set Monday is the first day of the week and
  // starts at 0. let's correct that
  return [
    { key: 1, value : data.find(b => b.key === 6)?.value ?? 0 },
    { key: 2, value : data.find(b => b.key === 0)?.value ?? 0 },
    { key: 3, value : data.find(b => b.key === 1)?.value ?? 0 },
    { key: 4, value : data.find(b => b.key === 2)?.value ?? 0 },
    { key: 5, value : data.find(b => b.key === 3)?.value ?? 0 },
    { key: 6, value : data.find(b => b.key === 4)?.value ?? 0 },
    { key: 7, value : data.find(b => b.key === 5)?.value ?? 0 },
  ]
}

const useFetchHoursOfTheDay = () => {
  const bins = useFetchStatistics<Bin[]>('/api-requests/hour-of-the-day');
  if(!bins) return bins;
  // Make the bins relative by calculating the percentage
  const sum = bins.reduce((prev, cur) => prev + cur.quantity, 0);
  return bins.map(b => ({ key: b.interval, value: b.quantity / sum * 100 }));
}
