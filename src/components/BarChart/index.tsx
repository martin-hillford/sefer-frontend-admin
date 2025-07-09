import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Colors } from 'sefer/types/Colors';
import { Loading } from 'sefer/components';

interface Props {
    color?: Colors
    data : { key : string | number, value: number }[] | null | undefined
    height? : number
    name: string
    unit?: string
}

export const BarChart = (props : Props) => {
  const options = getOptions(props);
  const { height = 200 } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<EChartsType | null>(null);

  useEffect(() => {
    if (!ref?.current || !options) return () => {};
    const plot = echarts.init(ref.current, undefined, { renderer: 'svg' });
    plot.setOption(options);
    setChart(plot);

    const handleResize = () => {
      setTimeout(() => { plot.resize(); }, 2);
    };

    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, [ref, options, chart]);

  return (
    <Wrapper ref={ref} style={{ height }}>
      {!options && <Loading variant="medium" />}
    </Wrapper>
  );
};

const getOptions = (props : Props) => {
  const { color = Colors.Blue, data, name, unit } = props;
  if (!data) return undefined;

  return {
    color: [color],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '10',
      right: unit ? '50' : '10',
      bottom: '10',
      top: '10',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.map(item => item.key),
        axisTick: { alignWithLabel: true },
        name: unit ?? null
      }
    ],
    yAxis: [{ type: 'value' }],
    series: [
      {
        name,
        type: 'bar',
        barWidth: '75%',
        data: data.map(item => item.value),
      }
    ]
  };
};

const Wrapper = styled.div`
  width: 100%;
`;
