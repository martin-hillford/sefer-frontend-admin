import { Button, ButtonGroup, Header, JumbotronLayout, Line } from 'sefer/components';
import { Education, Plus } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import styles from './courses.module.css';

export const NoCourses = () => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const crumbs = [{ label: terms.courses }];

  const addCourse = () => navigate('/courses/edit/');

  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      <div className={styles.noCoursesContainer}>
        <Header variant="large">{terms.courses}</Header>
        <div>{terms.noCourses}</div>
        <Line />
        <ButtonGroup $pull="right">
          <Button onClick={addCourse} icon={<Plus size={16} />}>{terms.add}</Button>
        </ButtonGroup>
      </div>
    </JumbotronLayout>
  );
};
