import { Button, EntitiesPanel, EntityForm, JumbotronLayout } from 'sefer/components';
import { Stats, User as UserIcon } from 'sefer/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserRole from 'types/data/UserRole';
import { Student } from 'types/data/users/Student';
import { Actions } from './Actions';
import { Details } from './Details';
import { useFetchStudents } from 'hooks/useFetchStudents';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { EntitiesNotFoundLayout } from '../../../components/EntitiesNotFoundLayout';

export default () => {
  const { students, setStudents} = useFetchStudents();
  const terms = useLocalization(localization);
  const crumbs = [{ label: terms.users, link: '/users' }, { label: terms.students }];
  const [selected, setSelected] = useState<Student>();
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const studentId = new URLSearchParams(search).get('student');
    if (!students || !studentId) return;
    const request = students.find(s => s.id === parseInt(studentId));
    if (request) setSelected(request);
  }, [students, search]);

  const updateStudent = (student : Student) => {
    if (!selected || !students) return;

    const index = students.findIndex(u => u.id === student.id);
    const data = [...students];
    data[index] = student;

    setStudents(data);
    setSelected(student);
  };

  const onBlockChanged = (blocked : boolean) => {
    if (selected) updateStudent({ ...selected, blocked });
  };

  const onRoleChanged = (role : UserRole | undefined) => {
    if (!selected || !students || !role) return;
    if (role === UserRole.Student) updateStudent({ ...selected, role });
    else {
      setStudents(students.filter(u => u.id !== selected.id));
      setSelected(undefined);
    }
  };

  const onActivated = () => {
    if (selected) updateStudent({ ...selected, approved: true });
  };

  const buttons = (
    <Actions
      student={selected}
      onBlockChanged={onBlockChanged}
      onRoleChanged={onRoleChanged}
      onActivated={onActivated}
    />
  );

  const onViewStats = () => navigate('/stats/students');
  const statsButton = <Button onClick={onViewStats} icon={<Stats size={18} />} />;

  if(students?.length === 0)
    return <EntitiesNotFoundLayout {...terms } icon={<UserIcon size={13} />} {...terms} crumbs={crumbs} content={terms.noEntities} />

  return (
    <JumbotronLayout icon={<UserIcon size={13} />} {...terms} crumbs={crumbs}>
      <EntitiesPanel<Student>
        selected={selected}
        data={students}
        name="users"
        header={terms.students}
        additionalButtons={statsButton}
        onSelect={user => setSelected(user)}
        onGetLabel={u => u.name}
      >
        <EntityForm buttons={buttons}>
          <Details student={selected} />
        </EntityForm>
      </EntitiesPanel>
    </JumbotronLayout>
  );
}
