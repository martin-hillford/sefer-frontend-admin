import { Loading } from 'sefer/components';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Data {
  categories: string[]
  labels: string[]
  series: { name: string, data: number[] }[],
}

export default (props : { data: Data, height?: number}) => {
  const { data, height = 400 } = props;
  const options = getOptions(data);
  const ref = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<EChartsType | null>(null);

  useEffect(() => {
    if (!ref?.current || !chart || !options) return () => {};
    const handleResize = () => {
      setTimeout(() => { chart.resize(); }, 2);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, [chart, ref, options]);

  useEffect(() => {
    if (!ref?.current || !options || chart) return;
    const plot = echarts.init(ref.current, undefined, { renderer: 'svg' });
    plot.setOption(options);
    setChart(plot);
  }, [ref, options, chart]);

  return (

    <Wrapper ref={ref} style={{ height }}>
      {!options && <Loading variant="medium" />}
    </Wrapper>

  );
};

const getOptions = (data: Data) => ({
  color: ['#245b87', '#52b35b', '#ffa219', '#e73238', '#a53cb7', '#6d91af', '#8bcc91', '#ffc166', '#ef767b', '#af52bf'],
  legend: { data: data.categories },
  grid: {
    left: '10',
    right: '10',
    bottom: '10',
    containLabel: true,
    top: '30'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: data.labels
    }
  ],
  yAxis: [{ type: 'value', max: 100 }],
  series: data.series.map(series => ({ ...series, symbol: 'none', lineStyle: { width: 0 }, type: 'line', stack: 'Total', areaStyle: { opacity: 1 }, emphasis: { focus: 'series' } }))
});

const Wrapper = styled.div`

`;
