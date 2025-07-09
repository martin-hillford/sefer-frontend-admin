import React from 'react';
import { Histogram } from 'types/data/DashboardData';
import { HistogramChart } from '../HistogramChart';
import styled from 'styled-components';
import { Panel } from 'sefer/components';

export type TimeLineChartPanelProps = {
    title? : string,
    icon? : React.ReactNode,
    data : Histogram | undefined
    color : string
}

export const HistogramChartPanel = (props : TimeLineChartPanelProps) => (
  <Panel {...props}>
    <Container>
      <HistogramChart {...props} />
    </Container>
  </Panel>
);

const Container = styled.div`
    height: 200px;
`;
