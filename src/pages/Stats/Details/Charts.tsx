import { Range } from 'types/ui/Range';
import { Anchor } from 'sefer/components';
import { SubmittedLessonsChart } from './Charts/SubmittedLessonsChart';
import { ActiveStudentsChart } from './Charts/ActiveStudentsChart';
import { NewStudentsChart } from './Charts/NewStudentsChart';
import { NewEnrollmentsChart } from './Charts/NewEnrollmentsChart';
import { HomepageVisitsChart } from './Charts/HomepageVisitsChart';

export const Charts = ({ range } : {range : Range}) => (
  <>
    <Anchor id="active-students" />
    <ActiveStudentsChart range={range} />

    <Anchor id="submitted-lessons" />
    <SubmittedLessonsChart range={range} />

    <Anchor id="new-students" />
    <NewStudentsChart range={range} />

    <Anchor id="new-enrollments" />
    <NewEnrollmentsChart range={range} />

    <Anchor id="visitors" />
    <HomepageVisitsChart range={range} />
  </>
);
