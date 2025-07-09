import { Histogram } from 'types/data/DashboardData';
import { TimeLineChart } from 'components';

type HistogramChartProps = {
    data: Histogram | undefined,
    color : string,
    type? : string,
}

export const HistogramChart = ({ data, color, type = 'bar' }: HistogramChartProps) =>
  <TimeLineChart data={data} color={color} type={type} xAxis="value" />;
