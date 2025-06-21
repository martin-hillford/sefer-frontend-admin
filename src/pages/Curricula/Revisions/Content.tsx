import { Column, TwoColumns } from 'sefer/components';
import { Blocks } from './Blocks';
import { Current } from './Current';
import { RevisionProps } from './RevisionProps';
import { Years } from './Years';

export const Content = (props : RevisionProps) => (
  <TwoColumns>
    <Column $side="left">
      <Current {...props} />
    </Column>
    <Column $side="right">
      <Children {...props} />
    </Column>
  </TwoColumns>
);

const Children = (props : RevisionProps) => {
  const { curriculum } = props;
  const { useYears } = curriculum.editingRevision;
  if (useYears) return <Years {...props} />;
  return <Blocks {...props} />;
};
