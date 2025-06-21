import { Bold, ListGroup, ListGroupItem, Loading, Panel } from 'sefer/components';
import { Education, Message, User } from 'sefer/icons';
import styled from 'styled-components';
import { PeriodSummary as Data } from 'types/data/PeriodSummary';
import { Range } from 'types/ui/Range';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';
import { useFetchPeriodSummaryStats } from './useFetchPeriodSummaryStats';

export const PeriodSummary = ({ range } : {range : Range}) => {
  const summary = useFetchPeriodSummaryStats(range);
  const terms = useLocalization(localization);
  return (
    <Panel title={terms.totals}>
      {!summary && <Loading variant="medium" /> }
      {summary && <Summary {...summary} />}
    </Panel>
  );
};

const Summary = (props : Data) => {
  const { newStudents, activeStudents, messages, submittedLessons, completedCourses, averageReviewTime } = props;
  const terms = useLocalization(localization);
  return (
    <ListGroup>
      <ListGroupItem>
        <Icon><User size={16} /></Icon>
        <Bold>{newStudents}</Bold>
        &nbsp;{terms.newStudents}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><User size={16} /></Icon>
        <Bold>{activeStudents}</Bold>
        &nbsp;{terms.activeStudents}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Message size={16} /></Icon>
        <Bold>{messages}</Bold>
        &nbsp;{terms.sendMessages}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Education size={16} /></Icon>
        <Bold>{submittedLessons}</Bold>
        &nbsp;{terms.submittedLessons}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Education size={16} /></Icon>
        <Bold>{completedCourses}</Bold>
        &nbsp;{terms.completedCourses}
      </ListGroupItem>
      <ListGroupItem>
        <Icon><Education size={16} /></Icon>
        <Bold>{Math.abs(Math.round(averageReviewTime * 100) / 100)}</Bold>
        &nbsp;{terms.averageReviewTime}
      </ListGroupItem>
    </ListGroup>
  );
};

const Icon = styled.span`
    padding-right: 6px;
`;
