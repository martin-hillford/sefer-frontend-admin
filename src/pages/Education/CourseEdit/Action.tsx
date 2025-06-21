import { Button, ButtonGroup, Line } from 'sefer/components';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Action = (props : { courseId : number, onCancel: () => void, saveCourse: () => void }) => {
  const { courseId, onCancel ,saveCourse } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Line />
        <ButtonGroup $pull="right">
        <Button variant="default" onClick={onCancel} label={terms.cancel} />
        <Button show={courseId > 0} variant="default" link={`/courses/revisions/${courseId}`} label={terms.revisions} />
        <Button variant="primary" onClick={saveCourse} label={terms.save} />
      </ButtonGroup>
    </>
  )
}
