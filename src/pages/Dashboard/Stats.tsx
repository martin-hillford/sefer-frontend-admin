import { Bold, ListGroup, ListGroupItem, Panel } from 'sefer/components';
import { Education, Message, Stats as StatsIcon, User } from 'sefer/icons';
import { Link } from 'react-router-dom';
import releaseInfo from 'releaseInfo';
import styled from 'styled-components';
import { DashboardStats } from 'types/data/stats/DashboardStats';
import { LoadingStats } from './LoadingStats';
import StatLinks from './StatLinks';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type StatsProp = {
    data : DashboardStats | undefined,
    version : { build : string, database : string} | undefined,
    bounce : { percentage : number } | undefined
}

const Stats = (props : StatsProp) => {
  const { version, data, bounce } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Panel title={terms.moreStats}>
        <AdditionalStats data={data} bounce={bounce} />
      </Panel>
      <StatLinks />
      <Panel title="Versie informatie">
        <VersionInfo label={terms.frontEnd} value={`${releaseInfo?.buildId}`} />
        <VersionInfo label={terms.backEnd} value={version?.build} />
        <VersionInfo label={terms.database} value={version?.database} />
      </Panel>
    </>
  );
};

const AdditionalStats = (props : { data : DashboardStats | undefined, bounce? : { percentage : number }}) => {
  const { data, bounce } = props;
  if (!data || !bounce) return <LoadingStats />;
  const terms = useLocalization(localization);
  return (
    <ListGroup>
      <ListGroupItem>
        <Icon><User size={16} /></Icon>
        <Bold>{data.totalStudents}</Bold>
        &nbsp;{terms.totalStudents}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><User size={16} /></Icon>
        <Bold>{data.activeStudentsToday}</Bold>
        &nbsp;{terms.activeStudentsToday}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><User size={16} /></Icon>
        <Bold>{data.currentActiveStudents}</Bold>
        &nbsp;{terms.activeStudents}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Message size={16} /></Icon>
        <Bold>{data.messagesSendToday}</Bold>
        &nbsp;{terms.messagesSendToday}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Education size={16} /></Icon>
        <Bold>{data.totalLessonsSubmitted}</Bold>
         &nbsp;{terms.totalCompletedLessons}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Education size={16} /></Icon>
        <Bold>{data.totalCompletedCourses}</Bold>
        &nbsp;{terms.totalCompletedCourses}
      </ListGroupItem>
      <ListGroupItem>
        <Link to="/dashboard/mentors">
          <Icon><User size={16} /></Icon>
          <Bold>{data.activeMentorsToday}</Bold>
          &nbsp;{terms.activeMentorsToday}
        </Link>
      </ListGroupItem>
      <ListGroupItem>
        <Link to="/dashboard/details#visitors">
          <Icon><StatsIcon size={16} /></Icon>
          <Bold>{bounce.percentage?.toFixed(2)}%</Bold>
          &nbsp;{terms.bouncePercentage}
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
};

type VersionInfoProps = {
    label : string,
    value : string | undefined
}

const VersionInfo = (props : VersionInfoProps) => {
  const { label, value } = props;
  return (
    <VersionLine>
      <VersionLabel>{label}</VersionLabel>
      <VersionValue>{value}</VersionValue>
    </VersionLine>
  );
};

const VersionLabel = styled.div`
    flex: 0 0 95px;
    font-weight: bold;
`;

const VersionValue = styled.div`
    flex: 1 1 auto;
`;

const VersionLine = styled.div`
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 15px;
`;
const Icon = styled.span`
    padding-right: 6px;
`;

export default Stats;
