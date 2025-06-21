import { BackNoSaveButton, ButtonGroup, Line, Property, Switch, TextArea, TextField } from 'sefer/components';
import { Course } from 'types/data/Course';
import { Testimony, useTestimonyContext } from 'types/data/resources/Testimony';
import { SaveAction } from './SaveAction';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const TestimonyView = (props : {course : Course | null, testimony : Testimony }) => {
  const { course, testimony } = props;
  const context = useTestimonyContext(testimony);
  const terms = useLocalization(localization);

  const url = course ? `/content/testimonies/course/${course.id}` : '/content/testimonies/overall';

  return (
    <>
      <Property label={terms.displayName}>
        <TextField name="name" dataContext={context} />
      </Property>
      <Property label={terms.course}>
        {course && <span>{course.name}</span> }
        {!course && <span>-</span> }
      </Property>
      <Property label={terms.anonymous}>
        <Switch name="isAnonymous" dataContext={context} />
      </Property>
      <Property label={terms.content}>
        <TextArea name="content" dataContext={context} />
      </Property>
      <Line />
      <ButtonGroup $pull="right">
        <BackNoSaveButton context={context} url={url} />
        <SaveAction context={context} />
      </ButtonGroup>
    </>
  );
};
