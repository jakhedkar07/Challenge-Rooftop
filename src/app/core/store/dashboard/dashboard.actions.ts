import { createAction, props } from '@ngrx/store';
import { ChartData } from '../../models/dashboard.model';

export const loadDashboardData = createAction(
  '[Dashboard] Load Dashboard Data'
);

export const loadDashboardDataSuccess = createAction(
  '[Dashboard] Load Dashboard Data Success',
  props<{ metrics: { [key: string]: ChartData } }>()
);

export const loadDashboardDataFailure = createAction(
  '[Dashboard] Load Dashboard Data Failure',
  props<{ error: string }>()
);

export const selectMetric = createAction(
  '[Dashboard] Select Metric',
  props<{ metricKey: string }>()
);

export const changeColorScheme = createAction(
  '[Dashboard] Change Color Scheme',
  props<{ colorScheme: string }>()
); 