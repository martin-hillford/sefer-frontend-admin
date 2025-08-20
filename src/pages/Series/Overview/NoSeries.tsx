import { Button, ButtonGroup, Header, JumbotronLayout, Line } from 'sefer/components';
import { Education, Plus } from 'sefer/icons';
import { useNavigate } from 'react-router-dom';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import styles from './series.module.css';

export const NoSeries = () => {
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const crumbs = [{ label: terms.seriesLabel }];

  const addSerries = () => navigate('/series/add');

  return (
    <JumbotronLayout title={terms.seriesLabel} subTitle={terms.courseManagement} icon={<Education size={13} />} crumbs={crumbs}>
      <div className={styles.noSeriesContainer}>
        <Header variant="large">{terms.seriesLabel}</Header>
        <div>{terms.noSeries}</div>
        <Line />
        <ButtonGroup $pull="right">
          <Button onClick={addSerries} icon={<Plus size={16} />}>{terms.add}</Button>
        </ButtonGroup>
      </div>
    </JumbotronLayout>
  );
};
