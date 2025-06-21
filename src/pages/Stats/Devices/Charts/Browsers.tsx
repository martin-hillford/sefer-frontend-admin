import { Loading, Panel } from 'sefer/components';
import { useMemo } from 'react';
import styled from 'styled-components';
import CategoryItemWeekly from 'types/data/stats/CategoryItemWeekly';
import { useFetchStatistics } from 'hooks/useFetchStatistics';
import StackedAreaChart from './StackedAreaChart';
import processData from './processData';
import { useLocalization } from 'sefer/hooks/useLocalization';
import { localization } from '../localization';

export default () => {
  const browsers = useFetchStatistics<CategoryItemWeekly[]>('/browsers/weekly');
  const data = useMemo(() => processData(browsers), [browsers]);
  const terms = useLocalization(localization);

  return (

    <Panel title={terms.browsers}>
      <Wrapper>
        {!data && <Loading />}
        {data && <StackedAreaChart height={400} data={data} />}
      </Wrapper>
    </Panel>

  );
};

const Wrapper = styled.div`
    height: 400px;
`;
