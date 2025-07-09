import { Alert, Bold, Button, ButtonGroup, ContentState, Header, Jumbotron, Line, Switch } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseWithRevisions } from 'types/data/CourseWithRevisions';
import { setWait } from 'util/setWait';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useGetContentState } from 'hooks/useGetContentState';
import { usePutRevision } from './usePutRevision';
import { TextEditor as TextArea } from 'components';

export const Content = (props: { course: CourseWithRevisions }) => {
  const { course } = props;
  const navigate = useNavigate();
  const putRevision = usePutRevision();
  const terms = useLocalization(localization);
  const [allowed, setAllowed] = useState(course.editingRevision.allowSelfStudy);
  const [generalInformation, setGeneralInfo] = useState(course.editingRevision.generalInformation ?? '');
  const contentState = useGetContentState(course.editingRevision.id);

  const [state, setState] = useState('default');

  const back = () => {
    setState('default');
    navigate(`/courses/revisions/${course.id}`);
  };

  const save = async () => {
    const saving = async () => {
      setState('saving');
      await putRevision({ ...course.editingRevision, generalInformation, allowSelfStudy: allowed });
    };
    await setWait(saving, () => { setState('saved'); }, 1500);
  };

  const header = terms.contentHeader
    .replace("@course", course.name)
    .replace("@version",course.editingRevision.version.toString());

  return (
    <Jumbotron>
      <Header variant="large">{header}</Header>
      <Switch label={terms.allowSelfStudy} value={allowed} onChange={setAllowed} />
      <ContentState state={contentState?.courseState} />
      <Bold>{terms.generalInfo}</Bold>
      <TextArea content={generalInformation} setContent={setGeneralInfo} />
      <Line />
      <ButtonGroup $pull="right">
        <Button variant="default" onClick={back}>{terms.cancel}</Button>
        <Button variant="primary" onClick={save}>{terms.save}</Button>
      </ButtonGroup>
      {state === 'saving' && <Saving content={terms.saving} />}
      {state === 'saved' && <Saved content={terms.saved} onClosed={back} />}
    </Jumbotron>
  );
};

const Saving = (props : { content: string }) => (
  <Alert overlay hide={false} closable={false} variant="primary">
    {props.content}
  </Alert>
);

const Saved = (props: { onClosed: () => void, content: string }) => {
  const { onClosed, content } = props;
  return (
    <Alert overlay closable onClosed={onClosed} variant="success">
      {content}
    </Alert>
  );
};
