import { Button, ButtonGroup, Header, JumbotronLayout, Line } from 'sefer/components';
import { Education, Plus } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import styles from './curricula.module.css';

export const NoCurriculums = () => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const crumbs = [{ label: terms.curriculums }];

  const addCurriculums = () => navigate('/curricula/new');

  return (
    <JumbotronLayout icon={<Education size={13} />} {...terms} crumbs={crumbs}>
      <div className={styles.noCurriculaContainer}>
        <Header variant="large">{terms.curriculums}</Header>
        <div>{terms.noCurriculums}</div>
        <Line />
        <ButtonGroup $pull="right">
          <Button onClick={addCurriculums} icon={<Plus size={16} />}>{terms.add}</Button>
        </ButtonGroup>
      </div>
    </JumbotronLayout>
  );
};
