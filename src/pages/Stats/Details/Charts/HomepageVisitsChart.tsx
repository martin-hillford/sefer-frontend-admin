import { User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { Colors } from 'sefer/types/Colors';
import { Range } from 'types/ui/Range';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { getBinSize } from 'util/binsize';
import { useGet } from 'sefer-fetch';
import { Histogram } from 'types/data/DashboardData';

export const HomepageVisitsChart = (props : {range : Range}) => {
  const { range } = props;
  const data = useData(range);
  const terms = useLocalization(localization);
  return (
    <TimeLineChartPanel
      icon={<User size={20} />}
      title={terms.homepageVisits}
      data={data}
      color={Colors.Purple}
    />
  );
};

const useData = ({ start, end } : { start : number, end : number}) => {
  const { lower, upper, bins } = getBinSize(start, end);
  const data = useGet<Histogram>(`/stats/homepage-visits?lower=${lower}&upper=${upper}&bin=${bins}`);
  if (data  === null) throw new Error('Could not fetch the homepage visits stats');
  return data;
};
