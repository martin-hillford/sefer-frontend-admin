import { Container, Header, Line, Switch, TextField } from 'sefer/components';
import { useEffect, useState } from 'react';
import { CurriculumWithRevisions as Curriculum } from 'types/data/curricula/Revision';
import { Actions } from './Actions';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const Properties = (props : { curriculum : Curriculum, save : (years : number | null) => Promise<boolean> }) => {
  const { curriculum, save } = props;
  const terms = useLocalization(localization);
  const [years, setYears] = useState<number | null>(null);
  const [useYears, setUseYears] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setYears(curriculum.editingRevision.years);
    setUseYears(curriculum.editingRevision.useYears);
    setHasChanges(false);
  }, [curriculum]);

  const onValidate = async () => {
    const valid = !useYears || !!years;
    if (!valid) setHasError(true);
    return valid;
  };

  const onYearsChanged = (value : number | null) => {
    setHasChanges(true);
    setYears(value);
  };

  const onUseYearsChanged = (value : boolean) => {
    setHasChanges(true);
    setUseYears(value);
    if (!value) setYears(0);
  };

  const header = terms.curriculumTitle
      .replace('@name', curriculum.name)
      .replace('@version', `${curriculum.editingRevision.version}`)

  return (
    <Container>
      <Header variant="large" children={header} />
      <Switch label={terms.switchLabel} name="useYears" value={useYears} onChange={onUseYearsChanged} />
      {useYears && <Years hasError={hasError} years={years} setYears={onYearsChanged} /> }
      <Line />
      <Actions
        curriculum={curriculum}
        save={save}
        hasChanges={hasChanges}
        onValidate={onValidate}
        years={years}
      />
    </Container>
  );
};

const Years = (props : {years: number | null, setYears: (value: number) => void, hasError: boolean }) => {
  const { hasError, years, setYears } = props;
  const terms = useLocalization(localization);
  const error = !hasError ? null : terms.yearsError;
  return <TextField error={error} type="number" name="years" label={terms.yearsLabel} value={years} onChange={setYears} />;
};
