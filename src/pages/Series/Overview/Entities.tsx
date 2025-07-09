import { EntitiesPanel, EntityForm } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Series } from 'types/data/series/Series';
import { Actions } from './Actions';
import { Details } from './Details';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const getLabel = (series : Series) => series.name;

export type Props = {
    series?: Series[];
    refresh: () => void;
    onDelete: (series : Series) => Promise<boolean>;
    onChange: (seriesId: number, setPublic: boolean) => Promise<boolean>;
    saveSequence: (series : Series[]) => Promise<void>;
}

export const Entities = (props : Props) => {
  const { series, refresh, saveSequence } = props;
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Series>();
  const terms = useLocalization(localization);

  const actions = <Actions selected={selected} {...props} />;
  const form = <EntityForm buttons={actions}><Details series={selected} /></EntityForm>;

  return (
    <EntitiesPanel
      data={series}
      name="series"
      header="Series"
      onSelect={c => setSelected(c)}
      onGetLabel={getLabel}
      onAdd={() => navigate('/series/add')}
      sort={{
        inProgress:  terms.inProgress,
        completed: terms.completed,
        save: saveSequence,
        onClosed: refresh
      }}
    >
      {form}
    </EntitiesPanel>
  );
};
