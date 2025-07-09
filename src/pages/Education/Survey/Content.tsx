import { Alert, Button, ButtonGroup, Header, Jumbotron, Line, Switch } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveySettings } from 'types/data/SurveySettings';
import { setWait } from 'util/setWait';
import { useDataContext } from 'sefer/hooks';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { useSaveSurveyRevision } from './useSaveSurveyRevision';

export const Content = (props: { settings: SurveySettings }) => {
  const navigate = useNavigate();
  const { settings } = props;
  const [state, setState] = useState('default');
  const dataContext = useDataContext(settings);
  const terms = useLocalization(localization).settings;
  const saveSurveyRevision = useSaveSurveyRevision();

  const back = () => {
    setState('default');
    navigate(`/courses/revisions/${dataContext?.data.courseId}`);
  };

  const save = async () => {
    const saving = async () => {
      setState('saving');
      await saveSurveyRevision(dataContext?.data);
    };
    await setWait(saving, () => { setState('saved'); }, 100);
  };

  return (
    <Jumbotron>
      <Header variant="large">{terms.header}</Header>
      <Switch
        tooltip={terms.enableTooltip}
        flex={50}
        maxWidth={false}
        label={terms.enable}
        name="enableSurvey"
        dataContext={dataContext}
      />
      <Switch
        tooltip={terms.courseRatingTooltip}
        flex={50}
        maxWidth={false}
        label={terms.courseRating}
        name="enableCourseRating"
        dataContext={dataContext}
      />
      <Switch
        tooltip={terms.mentorRatingTooltip}
        flex={50}
        maxWidth={false}
        label={terms.mentorRating}
        name="enableMentorRating"
        dataContext={dataContext}
      />
      <Switch
        tooltip={terms.testimonialTooltip}
        flex={50}
        maxWidth={false}
        label={terms.testimonial}
        name="enableTestimonial"
        dataContext={dataContext}
      />
      <Switch
        tooltip={terms.socialTooltip}
        flex={50}
        maxWidth={false}
        label={terms.social}
        name="enableSocialPermissions"
        dataContext={dataContext}
      />
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

const Saving = (props: { content: string }) => (
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
