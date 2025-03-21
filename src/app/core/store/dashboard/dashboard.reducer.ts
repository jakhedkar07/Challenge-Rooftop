import { createReducer, on } from '@ngrx/store';
import { DashboardState } from '../../models/dashboard.model';
import * as DashboardActions from './dashboard.actions';

export const initialState: DashboardState = {
  metrics: {},
  selectedMetricKey: null,
  loading: false,
  error: null,
  colorScheme: 'vivid'
};

export const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboardData, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DashboardActions.loadDashboardDataSuccess, (state, { metrics }) => ({
    ...state,
    metrics,
    selectedMetricKey: state.selectedMetricKey || Object.keys(metrics)[0],
    loading: false
  })),
  on(DashboardActions.loadDashboardDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(DashboardActions.selectMetric, (state, { metricKey }) => ({
    ...state,
    selectedMetricKey: metricKey
  })),
  on(DashboardActions.changeColorScheme, (state, { colorScheme }) => ({
    ...state,
    colorScheme
  }))
); 