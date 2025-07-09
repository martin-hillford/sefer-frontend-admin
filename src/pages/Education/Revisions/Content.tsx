import { Button, ButtonGroup, Column, ContentState, Header, Line, Property, TwoColumns } from 'sefer/components';
import { ArrowLeft, Dictionary, Edit, False, Share, True } from 'sefer/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseWithRevisions } from 'types/data/CourseWithRevisions';
import { Close } from './Close';
import { Lessons } from './Lessons';
import { Publish } from './Publish';
import { useGetContentState } from 'hooks/useGetContentState';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';
import { limitStringBySpace } from 'util/limitStringBySpace';

export const Content = (props: { course: CourseWithRevisions, courseId: number, refresh: () => void }) => {
  const { course, refresh, courseId } = props;
  const [state, setState] = useState('default');
  const contentState = useGetContentState(course.editingRevision.id);
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const revisionChanged = () => {
    setState('default');
    refresh();
  };

  return (
    <TwoColumns>
      <Column $side="left">
        <Header variant="large">{terms.currentRevision}</Header>
        <Property label={terms.selfStudy}>
          {course.editingRevision.allowSelfStudy && <True size={16} />}
          {!course.editingRevision.allowSelfStudy && <False size={16} />}
        </Property>
        <Property label={terms.currentRevision}>
          {terms.version} {course.editingRevision.version}
        </Property>
        {course.publishedRevision && <Property label={terms.publishedRevision}>
          {terms.version} {course.publishedRevision.version}
        </Property>}
        <ContentState state={contentState?.courseState} />
        <Property label={terms.generalInfo}>
          {limitStringBySpace(course.editingRevision?.generalInformation)}
        </Property>
        <Line />
        <ButtonGroup $pull="right">
          <Button
            onClick={() => navigate('/courses')}
            icon={<ArrowLeft size={20} />}
          />
          <Button
            onClick={() => navigate(`/courses/dictionary/${course.editingRevision.id}`)}
            icon={<Dictionary size={20} />}
          />
          <Button
            onClick={() => navigate(`/courses/survey/${course.editingRevision.id}`)}
            label={terms.survey}
          />
          <Button
            onClick={() => setState('publish')}
            icon={<Share size={20} />}
            label={terms.publish}
          />
          <Button
            show={!!course.publishedRevision}
            onClick={() => setState('close')}
            label={terms.close}
          />
          <Button
            onClick={() => navigate(`/courses/revision/${course.id}`)}
            icon={<Edit size={20} />}
          />
        </ButtonGroup>
      </Column>
      <Column $side="right">
        <Lessons courseId={courseId} course={course} contentState={contentState} />
      </Column>
        <Publish
          show={state === 'publish'}
          revisionId={course.editingRevision.id}
          onCanceled={() => setState('default')}
          onPublished={revisionChanged}
        />
        <Close
          show={state === 'close' && !!course.publishedRevision}
          revisionId={course?.publishedRevision?.id}
          onCanceled={() => setState('default')}
          onClosed={revisionChanged}
        />
    </TwoColumns>
  );
};
