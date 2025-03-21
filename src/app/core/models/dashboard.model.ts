export interface MetricData {
  name: string;
  value: number;
  series?: MetricData[];
}

export interface ChartData {
  title: string;
  type: 'bar' | 'line' | 'pie' | 'gauge' | 'advanced-pie';
  data: any[];
}

export interface DashboardState {
  metrics: { [key: string]: ChartData };
  selectedMetricKey: string | null;
  loading: boolean;
  error: string | null;
  colorScheme: string;
} 