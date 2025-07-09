import { Button, ButtonGroup } from 'sefer/components';
import { UnsubscribeButton } from 'components';
import { Mentor } from 'types/data/users/Mentor';
import EnrollmentSummary from './EnrollmentSummary';
import { ChangeMentorButton } from 'components/ChangeMentorButton';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

interface Props {
  refresh: (enrollment: { id: number; isActive: boolean; }) => void,
  enrollment: EnrollmentSummary,
  mentors: Mentor[]
}

export const Actions = (props: Props) => {
  const { enrollment, mentors, refresh } = props;
  const hasLessons = (enrollment.submitted ?? 0) >= 1;
  const terms = useLocalization(localization);

  return (
    <ButtonGroup $pull="right">
      <Button
        show={hasLessons}
        link={`/users/student/enrollments/${enrollment.id}/lessons`}
        label={terms.lessons}
      />
      <UnsubscribeButton
        enrollment={enrollment}
        onEnrollmentChanged={refresh}
      />
      {!enrollment.isSelfStudy && (
        <ChangeMentorButton
          enrollment={enrollment}
          mentors={mentors}
          onEnrollmentChanged={refresh}
        />
      )}
    </ButtonGroup>
  );
};
