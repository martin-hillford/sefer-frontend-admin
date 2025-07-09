import { Education, User } from 'sefer/icons';
import styled from 'styled-components';
import { DashboardData } from 'types/data/DashboardData';
import { Colors } from 'sefer/types/Colors';
import { InfoBox } from './InfoBox';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const InfoBoxGrid = ({ data } : {data : DashboardData | undefined | null}) => {
  const terms = useLocalization(localization);
  return (
    <Grid>
      <div>
        <InfoBox
          label={terms.activeStudents}
          icon={<User size={30} />}
          value={data?.students?.sum}
          link="/dashboard/details#active-students"
          variant={Colors.Blue}
        />
      </div>
      <div>
        <InfoBox
          label={terms.submittedLessons}
          icon={<Education size={30} />}
          value={data?.submittedLessons?.sum}
          link="/dashboard/details#submitted-lessons"
          variant={Colors.Green}
        />
      </div>
      <div>
        <InfoBox
          label={terms.newStudents}
          icon={<User size={30} />}
          value={data?.newStudents?.sum}
          link="/dashboard/details#new-students"
          variant={Colors.Orange}
        />
      </div>
      <div>
        <InfoBox
          label={terms.newEnrollments}
          icon={<Education size={30} />}
          value={data?.newEnrollments?.sum}
          link="/dashboard/details#new-enrollments"
          variant={Colors.Red}
        />
      </div>
    </Grid>
  );
}

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;

    > div {
        flex: 0 0 100%;
        @media (min-width: 720px) { flex: 0 0 50% }
        @media (min-width: 1200px) { flex: 0 0 25% }
    }

    & > div:nth-child(1) {
        padding-right: 0;
        @media (min-width: 720px) { padding-right: 11.5px; }
        @media (min-width: 1200px) { padding-right: 17.25px; }
    }

    & > div:nth-child(2) {
        padding-left: 0;
        @media (min-width: 720px) { padding-left: 11.5px; }
        @media (min-width: 1200px) { padding-left: 5.75px; padding-right: 11.5px }
    }

    & > div:nth-child(3) {
        padding-right: 0;
        @media (min-width: 720px) { padding-right: 11.5px; }
        @media (min-width: 1200px) { padding-left: 11.5px; padding-right: 5.75px;  }
    }

    & > div:nth-child(4) {
        padding-left: 0;
        @media (min-width: 720px) { padding-left: 11.5px; }
        @media (min-width: 1200px) { padding-left: 17.25px; }
    }
`;
