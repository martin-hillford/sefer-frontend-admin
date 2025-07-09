import { ConfirmDialog, DropDown, Property } from 'sefer/components';
import styled from 'styled-components';
import { Mentor } from 'types/data/users/Mentor';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Props = {
    onConfirmed: () => void;
    onCanceled: () => void;
    mentor?: Mentor;
    mentors: Mentor[];
    onMentorChange: (mentorId: number) => void;
    show: boolean
}

export const ChangeMentorDialog = (props: Props) => {
  const { mentors, mentor, onMentorChange, onConfirmed, onCanceled, show } = props;
  const terms = useLocalization(localization);
  if(!show) return null;

  const options = mentors.map(m => ({ value: m.id, label: m.name }));

  return (
    <ConfirmDialog
      header={terms.header}
      content={<Content mentor={mentor} onMentorChange={onMentorChange} options={options} />}
      buttonText={terms.buttonText}
      onConfirmed={onConfirmed}
      onCanceled={onCanceled}
      variant="primary"
    />
  );
};

const Content = (props: { mentor?: Mentor, onMentorChange: (mentor: number) => void, options: { value: number, label: string }[] }) => {
  const { mentor, onMentorChange, options } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Sizer>{terms.question}</Sizer>
      <Property label={terms.question}>
        <DropDown value={mentor?.id} onChange={onMentorChange} name="userRole" options={options} />
      </Property>
    </>
  );
};

const Sizer = styled.div`
    width: 400px;
    padding-bottom: 12px;
`;
