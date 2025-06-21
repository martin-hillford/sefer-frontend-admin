import * as echarts from 'echarts';
import { EChartsOption, EChartsType } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Histogram } from 'types/data/DashboardData';
import { Loading } from 'sefer/components';

export interface TimeLineData {
  data : Array<{ interval : string, quantity : number}>
}

interface TimeLineChartProps {
    data: Histogram | undefined | TimeLineData | null,
    color: string,
    type?: string,
    xAxis?: string
}

export const TimeLineChart = ({ data, color, type = 'line', xAxis = 'time' }: TimeLineChartProps) => {
  const options = data ? getOptions(data, color, type, xAxis) : undefined;
  return <TimeLineChartWithData color={color} options={options} />;
};

const getOptions = (histogram : Histogram | undefined | TimeLineData, color : string, type : string, xAxis: string) => {
  if (!histogram) return undefined;

  const series = histogram.data.map(p => [p.interval, p.quantity]);
  return {
    xAxis: { type: xAxis },
    yAxis: { type: 'value' },
    series: [{ data: series, type, smooth: true, showSymbol: false }],
    grid: { left: 40, top: 15, right: 15, bottom: 25 },
    color: [color]
  } as EChartsOption
};



type TimeLineChartWithDataProps = {
    options : EChartsOption | undefined,
    color : string,
}

const TimeLineChartWithData = (props: TimeLineChartWithDataProps) => {
  const { options, color } = props;
  const [chart, setChart] = useState<EChartsType | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref?.current || !chart || !options) return () => {};
    const handleResize = () => {
      setTimeout(() => { chart.resize(); }, 2);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, [chart, ref, options]);

  useEffect(() => {
    if (!ref?.current || !options) return;
    let plot = chart;
    if (!plot) plot = echarts.init(ref.current, undefined, { renderer: 'svg' });
    plot.setOption(options);
    setChart(plot);
  }, [ref, options, chart]);

  return (
    <ChartContainer $withOptions={!!options}>
      <div ref={ref}>
        {!options && <Loading color={color} variant="medium" />}
      </div>
    </ChartContainer>
  );
};

export const ChartContainer = styled.div<{$withOptions :boolean}>`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;

    > div {
        width: 100%;
        ${p => (p.$withOptions ? 'height: 100%' : '')}
    }
`;
