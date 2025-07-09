import { Cards, FoldingHeader, Header, Italic } from 'sefer/components';
import styled from 'styled-components';
import { CorrectedAnswer } from 'types/data/users/CorrectedAnswer';
import { EnrollmentDetails } from 'types/data/enrollments/EnrollmentDetails';
import { Submission } from 'types/data/users/Submission';
import { AnswerCard } from './AnswerCard';
import { Card } from 'sefer/components/Cards';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = (props : { enrollment : EnrollmentDetails }) => {
  const { enrollment } = props;
  const rows = enrollment.submissions.map(s => <Row key={s.id} submission={s} />);
  const terms = useLocalization(localization);
  return (
    <Container>
      <Header variant="x-large">{terms.submittedLessons}</Header>
      {rows}
    </Container>
  );
};

const Container = styled.div`
    display: block;
    width: 100%;
`;

const Row = (props : { submission : Submission }) => {
  const { submission } = props;
  const content = <SubmissionDetails submission={submission} />;
  return (
    <RowContainer>
      <FoldingHeader inline={false} variant="small" content={content}>
        {submission.lesson}
      </FoldingHeader>
    </RowContainer>
  );
};

const SubmissionDetails = (props : { submission : Submission }) => {
  const { submission } = props;
  const terms = useLocalization(localization);

  if (submission.answers.length === 0) return <Card><Italic>{terms.noLessonsSubmitted}</Italic></Card>;
  const onRender = (answer : CorrectedAnswer) => <AnswerCard answer={answer} />;
  return <Cards entities={submission.answers} onRender={onRender} />;
};

const RowContainer = styled.div`
    padding-top:1px
`;
