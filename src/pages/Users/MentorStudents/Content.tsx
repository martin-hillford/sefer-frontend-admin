import { Button, ButtonGroup, EntitiesNotFound, EntitiesPanel, EntityForm, Loading } from 'sefer/components';
import { MessageButton, UserBlockButton } from 'components';
import { useState } from 'react';
import { MentorStudent, MentorStudents } from 'types/data/users/MentorStudents';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { Details } from './Details';

export const Content = (props: { data: MentorStudents | null | undefined, refresh: () => void }) => {
  const [selected, setSelected] = useState<MentorStudent>();
  const terms = useLocalization(localization);
  const { data, refresh } = props;

  if (!data) return <Loading variant="huge" />;
  const { students } = data;

  const buttons = <Actions student={selected} onBlockChanged={refresh} />;
  return (
    <>
      {students?.length === 0 && <EntitiesNotFound header={terms.students} content={terms.noStudents} />}
      <EntitiesPanel
        data={students}
        name="mentor-students"
        header={terms.students}
        onSelect={setSelected}
        onGetLabel={u => u.name}
      >
        <EntityForm buttons={buttons}>
          <Details student={selected} />
        </EntityForm>
      </EntitiesPanel>
    </>
  );
};

const Actions = (props: { student?: MentorStudent, onBlockChanged: (blocked: boolean) => void }) => {
  const { student, onBlockChanged } = props;
  const terms = useLocalization(localization);

  if (!student) return null;
  return (
    <ButtonGroup $pull="right">
      <Button link={`/users/student/${student.id}/enrollments`}>{terms.enrollments}</Button>
      <MessageButton user={student} />
      <UserBlockButton user={student} onBlockChanged={onBlockChanged} />
    </ButtonGroup>
  );
};
