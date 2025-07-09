import { Bold, Boolean, DateLabel, Property, Rating } from 'sefer/components';
import { SurveyResult } from 'types/data/enrollments/SurveyResult';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const SurveyResultView = (props : { result: SurveyResult}) => {
  const { result } = props;
  const terms = useLocalization(localization);

  return (
    <>
      <Property condensed label={terms.student}>
        {result.student.name}
      </Property>
      <Property condensed label={terms.date}>
        <DateLabel value={result.closureDate} />
      </Property>
      <Property condensed label={terms.socialMedia}>
        <Boolean size={15} value={result.socialPermissions} />
      </Property>

      <Spacer />

      <Property condensed label={terms.course}>{result.course.name}</Property>
      <Property condensed label={terms.rating}>
        <Rating value={result.courseRating} />
      </Property>

      <Mentor {...props} />
      <Text {...props} />
    </>
  );
};

const Mentor = (props : { result: SurveyResult}) => {
  const { result } = props;
  const terms = useLocalization(localization);

  if (!result?.mentor) return null;
  return (
    <>
      <Spacer />
      <Property condensed label={terms.mentor}>{result.mentor?.name}</Property>
      <Property condensed label={terms.rating}>
        <Rating value={result.mentorRating} />
      </Property>
    </>
  );
};

const Text = (props : { result: SurveyResult}) => {
  const { result } = props;
  const terms = useLocalization(localization);

  if (!result?.text) return null;
  return (
    <>
      <Spacer />
      <Bold>{terms.testimony}</Bold><br />
      {result.text}
    </>
  );
};

const Spacer = () => <br />;
