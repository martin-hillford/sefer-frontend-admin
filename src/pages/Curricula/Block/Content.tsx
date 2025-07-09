import { Column, Header, Line, TextArea, TextField, TwoColumns } from 'sefer/components';
import { useState } from 'react';
import { CourseList } from './CourseList';
import { Courses } from './Courses';
import { BlockProps } from './BlockProps';
import { Actions } from './Actions';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Content = (props: BlockProps & { show: boolean}) => {
  const { block, show } = props;
  const [showCourses, setShowCourses] = useState(false);
  const [showError, setShowError] = useState(false);
  const toOverView = () => setShowCourses(false);
  const terms = useLocalization(localization);

  if(!show) return null;
  if (showCourses) return <Courses {...props} toOverView={toOverView} />;

  return (
    <TwoColumns>
      <Column $side="left">
        <Header children={terms.data} />
        <TextField dataContext={block} name="name" label={terms.name} />
        <TextArea dataContext={block} name="description" label={terms.description} />
      </Column>
      <Column $side="right">
        <Header children={terms.courses} />
        <CourseList {...props} error={showError} />
        <Line />
        <Actions
          setShowCourses={setShowCourses}
          setShowError={setShowError}
          {...props}
        />
      </Column>
    </TwoColumns>
  );
};
