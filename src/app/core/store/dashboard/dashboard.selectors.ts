import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../../models/dashboard.model';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectAllMetrics = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.metrics
);

export const selectMetricOptions = createSelector(
  selectAllMetrics,
  (metrics) => Object.keys(metrics).map(key => ({
    key,
    title: metrics[key].title
  }))
);

export const selectSelectedMetricKey = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.selectedMetricKey
);

export const selectSelectedMetric = createSelector(
  selectAllMetrics,
  selectSelectedMetricKey,
  (metrics, selectedKey) => selectedKey ? metrics[selectedKey] : null
);

export const selectLoading = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.loading
);

export const selectError = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.error
);

export const selectColorScheme = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.colorScheme
); 