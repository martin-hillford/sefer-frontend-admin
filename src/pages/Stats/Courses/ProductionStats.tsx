import { Panel } from 'sefer/components';
import { StackedBarChart } from 'components';
import { AlignJustify, Education, Stats } from 'sefer/icons';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { CourseProductionExtended } from 'types/data/stats/CourseProduction';
import { Colors } from 'sefer/types/Colors';
import { useProductionStats } from './useProductionStats';
import { useSystemSettings } from 'hooks/useSystemSettings';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from './localization';

export const ProductionStats = () => {
  const [absolute, setAbsolute] = useState(false);
  const terms = useLocalization(localization);
  const [ settings ] = useSystemSettings();
  const stats = useProductionStats(settings?.studentActiveDays);
  const data = getData(stats, absolute, terms.categories);

  const action = <Action absolute={absolute} setAbsolute={setAbsolute} />;
  return (
    <Panel action={action} icon={<Education size={20} />} title={terms.courseInfo}>
      <StackedBarChart absolute={absolute} data={data} />
    </Panel>
  );
};

const Action : FC<{absolute: boolean, setAbsolute : (value: boolean) => void}> = (props) => {
  const { absolute, setAbsolute } = props;

  return (
    <Button onClick={() => setAbsolute(!absolute)}>
      {absolute ? <Stats size={22} /> : <AlignJustify size={22} />}
    </Button>
  );
};

const getData = (stats : CourseProductionExtended[] | undefined | null, absolute : boolean, categories: string[]) => {
  if (!stats) return undefined;

  const data = stats.sort((a, b) => (absolute ? a.total - b.total : a.performance - b.performance));
  const bars = data.map(c => ({
    name: c.name,
    data: [c.active, c.done, c.inActive, c.cancelled],

  }));

  const colors = [Colors.Blue, Colors.Green, Colors.Orange, Colors.Red];
  return { bars, categories, colors };
};

const Button = styled.span`
    cursor: pointer;
`;
