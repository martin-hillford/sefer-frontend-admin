import { Bold, Button, ButtonGroup, ErrorText, Line, Property, Switch, TextField } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { Saved, Saving } from './Alerts';
import { EditContent } from './EditContent';
import { usePostTestimony } from './usePostTestimony';
import { usePostSurveyResultProcessed } from './usePostSurveyResultProcessed';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { getTestimony } from './getTestimony';
import { useValidateTestimony, Validation } from './useValidateTestimony';

export const Form = (props : { result : SurveyResult }) => {
  const { result } = props;
  const [testimony, setTestimony] = useState(getTestimony(result));
  const [errors, setErrors] = useState<Validation>({ name: null, content: null });
  const [adminProcessed, setAdminProcessed] = useState<boolean>(true);
  const [isCourseTestimony, setIsCourseTestimony] = useState<boolean>(true);
  const [isGenericTestimony, setIsGenericTestimony] = useState<boolean>(false);
  const [state, setState] = useState('none');
  const [error, setError] = useState<boolean>(false);
  const postTestimony = usePostTestimony();
  const postSurveyResultProcessed = usePostSurveyResultProcessed();
  const terms = useLocalization(localization);
  const validate = useValidateTestimony();

  const navigate = useNavigate();

  const onNameChange = (name : string) => {
    testimony.name = name;
    setTestimony({ ...testimony });
  };

  const onContentChange = (content : string) => {
    testimony.content = content;
    setTestimony({ ...testimony });
  };

  const onAnonymousChange = (isAnonymous : boolean) => {
    testimony.isAnonymous = isAnonymous;
    setTestimony({ ...testimony });
  };

  const onSave = async () => {
    const valid = validate(testimony, setErrors);
    if (!valid) return;
    if (!isCourseTestimony && !isGenericTestimony) return setError(true);

    setState('saving');
    if (isCourseTestimony) await postTestimony(testimony);
    if (isGenericTestimony) await postTestimony({ ...testimony, courseId: null });
    if (adminProcessed) await postSurveyResultProcessed(testimony.surveyResultId );
    setState('saved');
  };

  const onClose = () => navigate('/enrollments/feedback');

  return (
    <>
      <Property label={terms.displayName}>
        <TextField error={errors.name} name="name" value={testimony.name} onChange={onNameChange} />
      </Property>
      <EditContent content={testimony.content} onContentChange={onContentChange} error={errors.content} />

      {error && <ErrorText><Bold>{terms.specifyTestimonyType}</Bold><br /><br /></ErrorText>}

      <Property flex={75} maxWidth={false} label={terms.addAsCourseTestimony} error={error}>
        <Switch value={isCourseTestimony} onChange={setIsCourseTestimony} />
      </Property>
      <Property flex={75} maxWidth={false} label={terms.addAsGenericTestimony} error={error}>
        <Switch value={isGenericTestimony} onChange={setIsGenericTestimony} />
      </Property>
      <Property flex={75} maxWidth={false} label={terms.anonymous}>
        <Switch value={testimony.isAnonymous} onChange={onAnonymousChange} />
      </Property>
      <Property flex={75} maxWidth={false} label={terms.markFeedbackProcessed}>
        <Switch value={adminProcessed} onChange={setAdminProcessed} />
      </Property>
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={() => { navigate('/enrollments/feedback'); }}>{terms.back}</Button>
        <Button onClick={onSave} variant="primary">{terms.save}</Button>
      </ButtonGroup>
      {state === 'saving' && <Saving content={terms.savingTestimony} /> }
      {state === 'saved' && <Saved content={terms.testimonySaved} onClosed={onClose} /> }
    </>
  );
};
