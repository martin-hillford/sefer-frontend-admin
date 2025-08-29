import { Button, ButtonGroup } from 'sefer/components';
import { UnsubscribeButton } from 'components';
import { useAdminFrontendConfig } from 'hooks/useAdminFrontendConfig';
import { Enrollment } from 'types/data/enrollments/Enrollment';
import { Mentor } from 'types/data/users/Mentor';
import { RetakeButton } from './RetakeButton';
import { ChangeMentorButton } from 'components/ChangeMentorButton';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useLanguage } from 'sefer/hooks';

interface Props {
  enrollment: Enrollment,
  onEnrollmentChanged: (enrollment: { id: number; isActive: boolean; }) => void,
  mentors: Mentor[]
}

export const Actions = (props: Props) => {
  const { enrollment, onEnrollmentChanged } = props;
  const config = useAdminFrontendConfig();
  const language = useLanguage();
  const terms = useLocalization(localization);
  return (
    <ButtonGroup $pull="right">
      <Button
        show={enrollment.hasDiploma}
        target="_blank"
        href={`${config?.api}${enrollment?.diplomaUrl}/${language}`}
        label={terms.certificate}
      />
      <Button
        show={enrollment.hasLessons}
        link={`/users/student/enrollments/${enrollment.id}/lessons`}
        label={terms.lessons}
      />
      <ChangeMentorButton {...props} />
      <RetakeButton
        enrollment={enrollment}
        onEnrollmentChanged={id => onEnrollmentChanged({id, isActive: enrollment.isActive} )} />
      <UnsubscribeButton {...props} />
    </ButtonGroup>
  );
};
