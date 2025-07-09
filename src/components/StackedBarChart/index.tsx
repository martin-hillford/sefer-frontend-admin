import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Loading } from 'sefer/components';
import { Colors } from 'sefer/types/Colors';

type Props = {
    absolute : boolean,
    data : undefined | {
      bars : {
          name: string,
          data: number[]
      }[]
      categories : string[],
      width? : number,
      colors: Colors[]
    }
}

export const StackedBarChart = (props : Props) => {
  const options = getOptions(props);
  const { data } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<EChartsType | null>(null);

  useEffect(() => {
    if (!ref?.current || !options) return;
    const plot = echarts.init(ref.current, undefined, { renderer: 'svg' });
    plot.setOption(options);
    setChart(plot);
  }, [ref, options, chart]);

  const height = data ? data.bars.length * 50 + 120 : 120;
  return (

    <Wrapper ref={ref} style={{ height }}>
      {!options && <Loading variant="medium" />}
    </Wrapper>

  );
};

const getOptions = (props : Props) => {
  const { data, absolute } = props;
  if (!data) return undefined;

  const yAxis = data.bars.map(b => b.name);

  const series = data.categories.map(c => ({
    name: c,
    type: 'bar',
    stack: 'total',
    label: { show: true },
    data: [] as (undefined | number)[]
  }));

  data.bars.forEach(bar => {
    const values = getData(bar.data, absolute);
    for (let index = 0; index < values.length; index++) {
      const value = values[index];
      series[index].data.push(value ? values[index] : undefined);
    }
  });

  return {
    legend: { },
    grid: { left: '0%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: yAxis },
    series,
    color: data.colors
  };
};

const getData = (data : number[], absolute: boolean) => {
  if (absolute) return data;
  const total = data.reduce((a, b) => a + b, 0);
  return data.map(d => Math.floor((d / total) * 1000) / 10);
};

const Wrapper = styled.div`
  width: calc(100vw - 120px);
`;
