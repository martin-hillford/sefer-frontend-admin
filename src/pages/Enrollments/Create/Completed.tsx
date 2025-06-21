import { DateSelector, Property, Switch, TextField } from 'sefer/components';
import { FormProps } from './useEnrollmentCreation';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Completed = (props : FormProps) => {
  const { context } = props;
  const terms = useLocalization(localization);
  return (
    <>
      <Switch label={terms.completed} name="isCompleted" dataContext={context} />
      {context.data.isCompleted && <Details {...props} /> }
    </>
  );
};

const Details = (props : FormProps) => {
  const { context } = props;
  const terms = useLocalization(localization);

  const onChange = (date : number | undefined) => {
    context.setValue('completionDate', date);
  };

  return (
    <>
      <TextField label={terms.grade} name="grade" type="number" dataContext={context} />
      <Property label={terms.date} name="completionDate" dataContext={context}>
        <DateSelector
          onChange={onChange}
          startYear={2010}
        />
      </Property>
      <Switch label={terms.onPaper} name="onPaper" dataContext={context} />
    </>

  );
};
