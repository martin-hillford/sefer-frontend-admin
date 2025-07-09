import { User } from 'sefer/icons';
import { HistogramChartPanel } from 'components';
import { Colors } from 'sefer/types/Colors';
import { useFetchHistogram } from 'hooks/useFetchHistogram';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Stats = () => {
  const ages = useFetchHistogram('/stats/student-age')
  const terms = useLocalization(localization);

  return (
    <HistogramChartPanel
      icon={<User size={20} />}
      title={terms.studentAge}
      data={ages}
      color={Colors.Blue}
    />
  );
};
