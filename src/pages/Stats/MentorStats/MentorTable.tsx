import { Loading, Panel } from 'sefer/components';
import { User } from 'sefer/icons';
import styled from 'styled-components';
import { MentorPerformance } from 'types/data/MentorPerformance';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const MentorTable = (props : {data : MentorPerformance[] | undefined | null}) => {
  const { data } = props;
  const terms = useLocalization(localization);
  return (
    <Panel icon={<User size={20} />} title={terms.mentorPerformance}>
      {!data && <Loading variant="medium" />}
      {data && <DataTable data={data} />}
    </Panel>
  );
}

const DataTable = ({ data } : {data : Array<MentorPerformance>}) => {
  const terms = useLocalization(localization);
  return (
    <Table>
      <thead>
      <TableHeaderColumn>{terms.mentor}</TableHeaderColumn>
      <TableHeaderColumn>{terms.messagesPerStudent}</TableHeaderColumn>
      <TableHeaderColumn>{terms.averageReviewTime}</TableHeaderColumn>
      <TableHeaderColumn>{terms.daysActiveLastYear}</TableHeaderColumn>
      <TableHeaderColumn>{terms.studentRating}</TableHeaderColumn>
      </thead>
      <tbody>
      {data.map(mentor => <MentorRow key={mentor.id} data={mentor} />)}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
    width: 100%;
`;

const TableHeaderColumn = styled.th`
    vertical-align: top;
    text-align:left;
`;

const MentorRow = ({ data } : {data : MentorPerformance}) => (
  <tr>
    <Column value={data.name} />
    <Column value={data.averageMessagePerStudent} />
    <Column value={Math.round(data.reviewTimeInDays ?? 0) / 100} />
    <Column value={data.daysActive} />
    <Column value={data.averageMessagePerStudent} />
  </tr>
);

const Column = ({ value } : {value : number | undefined | string | null}) => {
  if (!value || value === '') return <td>-</td>;
  return <td>{value}</td>;
};
