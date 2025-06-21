import styled from 'styled-components';
import { Panel } from 'sefer/components';
import { Devices, Education, Grid, Stats, User as UserIcon } from 'sefer/icons';
import { Link } from 'react-router-dom';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export default () => {
  const terms = useLocalization(localization).moreStatsLink;
  return (
    <Panel title={terms.title}>
      <Container>
        <Link to="/stats/courses">
          <Icon><Education size={16} /></Icon>
          {terms.courses}
        </Link>
        <Link to="/stats/blogs">
          <Icon><Grid size={16} /></Icon>
          {terms.blogs}
        </Link>
        <Link to="/stats/mentors">
          <Icon><UserIcon size={16} /></Icon>
          {terms.mentors}
        </Link>
        <Link to="/stats/students">
          <Icon><UserIcon size={16} /></Icon>
          {terms.students}
        </Link>
        <Link to="/stats/devices">
          <Icon><Devices size={16} /></Icon>
          {terms.devices}
        </Link>
        <Link to="/stats/performance">
          <Icon><Stats size={16} /></Icon>
          {terms.performance}
        </Link>
      </Container>
    </Panel>
  );
}

const Icon = styled.span`
    padding-right: 6px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 15px;
    a {
        flex: 0 0 50%;
        display:block;
        @media(min-width: 1200px ) { flex: 0 0 33%; }
    }
`;
