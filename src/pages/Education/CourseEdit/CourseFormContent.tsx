import { Bold, DropDown, Header, Property, Stage, Switch, TextArea, TextField } from 'sefer/components';
import { ImageSelector } from 'components';
import { Course } from 'types/data/Course';
import { Action } from './Action';
import { useDataContext } from './useDataContext';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useLevelLabels } from 'sefer/components/Level/useLevelLabels';

export const CourseFormContent = (props : { course : Course, onSave : (data: Course) => Promise<void>, onCancel : () => void }) => {
  const { course, onCancel, onSave } = props;
  const [dataContext, setDataContext] = useDataContext(course);
  const { maxLessonSubmissionsPerDay } = dataContext.data;
  const terms = useLocalization(localization);
  const levels = useLevelLabels();

  const contextCourse = dataContext.data;
  dataContext.setListener(setDataContext);

  const isEditable = contextCourse.stage === 'Edit' || contextCourse.stage === 'Test';

  const saveCourse = async () => {
    const valid = await dataContext.validate();
    const max = (maxLessonSubmissionsPerDay?.toString() === '' ? null : maxLessonSubmissionsPerDay) ?? 0;
    if (valid) await onSave({ ...dataContext.data, maxLessonSubmissionsPerDay : max });
  };

  const header = terms.courseName.replace("@name", contextCourse.name);
  return (
    <>
      <Header variant="large">{header}</Header>
      <Property label={terms.stage}><Bold><Stage stage={contextCourse.stage} /></Bold></Property>
      <Property label={terms.name} name="name" dataContext={dataContext}>
        {!isEditable && <>{contextCourse.name} </> }
        {isEditable && <TextField name="name" dataContext={dataContext} /> }
      </Property>
      <Property label={terms.permalink} name="permalink" dataContext={dataContext}>
        {!isEditable && <>{contextCourse.permalink} </> }
        {isEditable && <TextField name="permalink" dataContext={dataContext} /> }
      </Property>
      <TextField type="number" label={terms.maxLessonsDaily} name="maxLessonSubmissionsPerDay" dataContext={dataContext} />
      <TextArea label={terms.description} name="description" dataContext={dataContext} />
      <TextArea label={terms.citation} name="citation" dataContext={dataContext} />
      <TextField label={terms.introductionLink} name="introductionLink" dataContext={dataContext} />
      <TextField label={terms.author} name="author" dataContext={dataContext} />
      <TextField label={terms.copyright} name="copyright" dataContext={dataContext} />
      <TextField label={terms.copyrightLogo} name="copyrightLogo" dataContext={dataContext} />
      <DropDown label={terms.level} name="level" options={levels} dataContext={dataContext} />
      <ImageSelector label={terms.largeImage} name="largeImage" dataContext={dataContext} />
      <ImageSelector label={terms.thumbnailImage} name="thumbnailImage" dataContext={dataContext} />
      <ImageSelector label={terms.headerImage} name="headerImage" dataContext={dataContext} />
      <Switch label={terms.isVideoCourse} name="isVideoCourse" dataContext={dataContext} />
      <Switch label={terms.isPrivate} name="private" dataContext={dataContext} />
      <Switch label={terms.showOnHomepage} name="showOnHomepage" dataContext={dataContext} />
      <TextField label={terms.webshopLink} name="webshopLink" dataContext={dataContext} />
      <Action courseId={course.id} saveCourse={saveCourse} onCancel={onCancel} />
    </>
  );
};
