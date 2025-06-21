import { Button, ButtonGroup, Header, Line, List } from 'sefer/components';
import { Pencil } from 'sefer/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurriculumWithRevisions } from 'types/data/curricula/Revision';
import { RevisionProps } from './RevisionProps';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

type Year = { id: number;  label: string; }

export const Years = (props: RevisionProps) => {
  const { curriculum } = props;
  const years = useYears(curriculum);
  const [selected, setSelected] = useState<Year | undefined>(years[0]);
  const navigate = useNavigate();
  const terms = useLocalization(localization);

  const edit = () => navigate(`/curricula/revisions/${curriculum.id}/years/${selected?.id}`);

  return (
    <>
      <Header variant="large">{terms.yearsHeader}</Header>
      <List
        items={years}
        getLabel={b => b.label}
        onSelect={setSelected}
        stretch={false}
      />
      <Line />
      <ButtonGroup $pull="right">
        <Button onClick={edit} disabled={!selected} icon={<Pencil size={20} />} />
      </ButtonGroup>
    </>
  );
};

const useYears = (curriculum: CurriculumWithRevisions) => {
  const terms = useLocalization(localization);
  const years = [{ id: 1, label: terms.yearOne }];
  if (curriculum.editingRevision.years === 1) return years;
  for (let year = 2; year <= curriculum.editingRevision.years; year++) {
    years.push({ id: year, label: terms.yearLabel.replace('@year', year.toString()) });
  }
  return years;
};
