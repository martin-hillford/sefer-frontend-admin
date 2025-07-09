import { EntitiesPanel, EntityForm } from 'sefer/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurriculumBase } from 'types/data/curricula/CurriculumBase';
import { Actions } from './Actions';
import { Curriculum } from './Curriculum';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

const getLabel = (curriculum : CurriculumBase) => curriculum.name;

export type Props = {
    curricula: CurriculumBase[];
    reload : () => void;
    onDelete : (curriculum : CurriculumBase) => Promise<boolean>;
}

export const Entities = (props : Props) => {
  const { curricula } = props;
  const navigate = useNavigate();
  const [selected, setSelected] = useState<CurriculumBase>();
  const addCurriculum = () => navigate('/curricula/new');

  const actions = <Actions curriculum={selected} {...props} />;
  const terms = useLocalization(localization);
  const form = <EntityForm buttons={actions}><Curriculum curriculum={selected} /></EntityForm>;

  return (
    <EntitiesPanel<CurriculumBase>
      data={curricula}
      name="curricula"
      header={terms.title}
      onSelect={c => setSelected(c)}
      onGetLabel={getLabel}
      onAdd={addCurriculum}
      children={form}
    />
  );
};
