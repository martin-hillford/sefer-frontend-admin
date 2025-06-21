import { Range } from 'types/ui/Range';
import { PeriodSummary } from './Summaries/PeriodSummary';
import { Enrollments } from './Summaries/Enrollments';

export const Summaries = ({ range } : {range : Range}) => (
  <>
    <PeriodSummary range={range} />
    <Enrollments range={range} />
  </>
);
