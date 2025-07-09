import { Panel } from 'sefer/components';
import { TimeLineChart, TimeLineData } from '../TimeLineChart';
import React from 'react';
import styled from 'styled-components';
import { Histogram } from 'types/data/DashboardData';

export type TimeLineChartPanelProps = {
  title? : string,
  icon? : React.ReactNode,
  data : Histogram | undefined | TimeLineData | null
  color : string
  xAxis?: string
  type?: string,
}

export const TimeLineChartPanel = (props : TimeLineChartPanelProps) => (
  <Panel {...props}>
    <Container>
      <TimeLineChart {...props} />
    </Container>
  </Panel>
);

const Container = styled.div`
    height: 200px;
`;
