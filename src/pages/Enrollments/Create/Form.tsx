import { Button, ButtonGroup, DropDown, Header, Line, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Completed } from './Completed';
import { FormProps } from './useEnrollmentCreation';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Form = (props : FormProps) => {
  const { context, onSave } = props;
  const navigate = useNavigate();
  const [state, setState] = useState('edit');
  const back = () => navigate('/enrollments');
  const terms = useLocalization(localization);

  const students = props.students?.map(s => ({ label: `${s.name} (${s.email})`, value: s.id }));
  const courses = props.courses?.map(c => ({ label: `${c.name}`, value: c.id }));
  const mentors = props.mentors?.map(m => ({ label: `${m.name}`, value: m.id }));

  const saved = () => navigate(`/users/student/${context.data.studentId}/enrollments`);

  const save = async () => {
    if (!await context.validate()) return;
    setState('saving');
    await onSave();
    setState('saved');
  };

  return (
    <>
      <Header variant="large">{terms.enrollments}</Header>
      <DropDown
        name="studentId"
        options={students}
        dataContext={context}
        placeholder={terms.selectStudent}
        label={terms.student}
      />
      <DropDown
        name="courseId"
        options={courses}
        dataContext={context}
        placeholder={terms.selectCourse}
        label={terms.course}
      />
      <DropDown
        name="mentorId"
        options={mentors}
        dataContext={context}
        placeholder={terms.selectMentor}
        label={terms.mentor}
      />
      <Completed {...props} />
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={back} label={terms.back} />
        <Button onClick={save} variant="primary" label={terms.add} />
      </ButtonGroup>
      <SavingAlert show={state === 'saving'} content={terms.savingAlert} />
      <SavedAlert show={state === 'saved'} content={terms.savedAlert} onClosed={saved} />
    </>
  );
};
