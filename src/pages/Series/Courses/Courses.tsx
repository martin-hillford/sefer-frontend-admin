import { DivisionList, SavedAlert, SavingAlert } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CourseBase as Course } from 'types/data/CourseBase';
import { SeriesWithCourse as Series } from 'types/data/series/Series';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Courses = (props : {series: Series, save: (courses: Course[]) => Promise<boolean>}) => {
  const { series, save } = props;
  const [state, setState] = useState<string>('initial');
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const back = () => navigate('/series');

  const onSave = async (courses: Course[]) => {
    setState('saving');
    await save(courses);
    setState("saved");
  };

  return (
    <Container>
      <SavingAlert show={state === "saving"} children={terms.savingAlert} />
      <SavedAlert show={state === "saved"} redirect="/series" children={terms.savedAlert} />
      <DivisionList
        available={series.availableCourses}
        selected={series.includedCourses}
        onCancel={back}
        onSave={onSave}
        availableLabel={terms.availableCourses}
        selectedLabel={terms.mandatoryCourses}
        header={terms.seriesHeader.replace('@series', series.name)}
        getEntityLabel={entity => entity.name}
        sortable="right"
      />
    </Container>
  );
};

const Container = styled.div`
    display:flex;
    @media (min-width: 1024px) {
        width: 100%;
        height: 100%;
    }
    flex-direction: column;
`;
