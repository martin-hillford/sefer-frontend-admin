import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';
import { Loading } from 'sefer/components';

type DonutChartProps = {
    data: Array<{ value : number, name : string}>
}

export const DonutChart = ({ data }: DonutChartProps) => {
  const [chart, setChart] = useState<EChartsType | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // resize effect
  useEffect(() => {
    if (!ref?.current || !chart || !data) return () => {};
    const handleResize = () => {
      setTimeout(() => { chart.resize(); }, 2);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, [chart, ref, data]);

  // effect when data is provided
  useEffect(() => {
    if (!ref?.current || !data) return;
    let plot = chart;
    if (!plot) plot = echarts.init(ref.current, undefined, { renderer: 'svg' });
    plot.setOption(getOptions(data));
    setChart(plot);
  }, [ref, data, chart]);

  return (
    <Container $withData={data !== undefined}>
      <div ref={ref}>
        {!data && <Loading variant="medium" />}
      </div>
    </Container>
  );
};

const Container = styled.div<{$withData :boolean}>`
    height: 200px;
    width : 100%;
    display: flex;
    align-items: center;
    justify-items: center;

    > div {
        width: 100%;
        ${p => (p.$withData ? 'height: 100%' : '')}
    }
`;

// Generates all the options for the donut chart
const getOptions = (data : Array<{ value : number, name : string}>) => {
  return {
    tooltip: { trigger: 'item', formatter: '<strong>{b}</strong> {c} ({d}%)' },
    legend: { left: 'right', top: 'center', orient: 'vertical', show: false },
    series: [
      {
        type: 'pie',
        radius: ['0%', '75%'],
        avoidLabelOverlap: true,
        label: { fontSize: 13, formatter: '{b} ({d}%)' },
        labelLine: { show: true },
        data,
        center: ['50%', '50%'],
      }
    ],
    color: [Colors.Blue, Colors.Orange, Colors.Red, Colors.Purple, Colors.Green, '#3c6d94', '#65bb6d', '#ffac32', '#ea494e', '#af52bf'],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
  } as echarts.EChartsCoreOption;
};
