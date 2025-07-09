import { Education, User } from 'sefer/icons';
import { TimeLineChartPanel } from 'components';
import { DashboardData } from 'types/data/DashboardData';
import { Colors } from 'sefer/types/Colors';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Histograms = ({ data } : {data : DashboardData | undefined}) => {
  const terms = useLocalization(localization);
  return (
    <>
      <TimeLineChartPanel
        icon={<User size={20} />}
        title={terms.activeStudents}
        data={data?.students}
        color={Colors.Blue}
      />
      <TimeLineChartPanel
        icon={<Education size={20} />}
        title={terms.submittedLessons}
        data={data?.submittedLessons}
        color={Colors.Green}
      />
      <TimeLineChartPanel
        icon={<User size={20} />}
        title={terms.newStudents}
        data={data?.newStudents}
        color={Colors.Orange}
      />
      <TimeLineChartPanel
        icon={<Education size={20} />}
        title={terms.newEnrollments}
        data={data?.newEnrollments}
        color={Colors.Red}
      />
    </>
  );
}
