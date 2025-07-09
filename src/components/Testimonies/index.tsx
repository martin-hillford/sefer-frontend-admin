import { Button, ButtonGroup, Cards, Line } from 'sefer/components';
import { Course } from 'types/data/Course';
import { Testimony } from 'types/data/resources/Testimony';
import { Card } from './Card';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Testimonies = (props : { testimonies : Testimony[], refresh : () => void, course : Course | null }) => {
  const { testimonies, refresh, course } = props;
  const hasTestimonies = testimonies.length !== 0;
  const link = `/content/testimonies/create${course ? `?course=${course?.id}` : ''}`;
  const onRender = (testimony : Testimony) => <Card testimony={testimony} refresh={refresh} />;
  const terms = useLocalization(localization);

  return (
    <>
      { hasTestimonies && <Cards entities={testimonies} onRender={onRender} /> }
      { !hasTestimonies && <p>{terms.noTestimonies}</p> }
      <Line />
      <ButtonGroup $pull="right">
        <Button link={link} label={terms.add} />
      </ButtonGroup>
    </>
  );
};
