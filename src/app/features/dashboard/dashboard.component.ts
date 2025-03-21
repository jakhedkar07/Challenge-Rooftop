import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';

import { Store } from '@ngrx/store';
import * as DashboardActions from '../../core/store/dashboard/dashboard.actions';
import * as DashboardSelectors from '../../core/store/dashboard/dashboard.selectors';
import { DynamicChartComponent } from './components/dynamic-chart/dynamic-chart.component';
import { Observable } from 'rxjs';
import { ChartData } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatGridListModule,
    DynamicChartComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="dashboard-toolbar">
        <span>Interactive Data Visualization Dashboard</span>
        <span class="spacer"></span>
      </mat-toolbar>

      <div class="dashboard-content">
        <mat-card class="settings-card">
          <mat-card-header>
            <mat-card-title>Dashboard Controls</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="control-section">
              <h3>Select Metric</h3>
              <mat-form-field appearance="fill">
                <mat-label>Metric</mat-label>
                <mat-select
                  [value]="(selectedMetricKey$ | async) ?? ''"
                  (selectionChange)="onMetricSelect($event.value)"
                >
                  <mat-option 
                    *ngFor="let option of (metricOptions$ | async)" 
                    [value]="option.key"
                    [title]="option.title"
                  >
                    {{ option.title }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="control-section">
              <h3>Color Scheme</h3>
              <mat-radio-group
                [value]="(colorScheme$ | async) ?? 'rich'"
                (change)="onColorSchemeChange($event.value)"
                class="color-scheme-radio-group"
              >
                <mat-radio-button value="rich">Rich</mat-radio-button>
                <mat-radio-button value="vivid">Vivid</mat-radio-button>
                <mat-radio-button value="cool">Cool</mat-radio-button>
                <mat-radio-button value="fire">Fire</mat-radio-button>
                <mat-radio-button value="nightLights">Night Lights</mat-radio-button>
              </mat-radio-group>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="visualization-card">
          <mat-card-header>
            <mat-card-title>{{ (selectedMetric$ | async)?.title || 'Select a Metric' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngIf="loading$ | async" class="loading-container">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading data...</p>
            </div>

            <div *ngIf="error$ | async as error" class="error-container">
              <p>{{ error }}</p>
              <button mat-raised-button color="primary" (click)="loadData()">
                Retry
              </button>
            </div>

            <div *ngIf="!(loading$ | async) && !(error$ | async)" class="chart-wrapper">
              <app-dynamic-chart
                [chartData]="selectedMetric$ | async"
                [colorScheme]="(colorScheme$ | async) ?? 'rich'"
              ></app-dynamic-chart>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .dashboard-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .dashboard-content {
      display: flex;
      padding: 16px;
      gap: 16px;
      overflow: hidden;
      height: calc(100vh - 64px);
    }

    .settings-card {
      flex: 1;
      min-width: 250px;
      max-width: 350px;
      overflow-y: auto;
    }

    .visualization-card {
      flex: 3;
      min-width: 500px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .control-section {
      margin-bottom: 20px;
    }

    mat-form-field {
      width: 100%;
    }

    .color-scheme-radio-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 300px;
    }

    .chart-wrapper {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .dashboard-content {
        flex-direction: column;
      }

      .settings-card, .visualization-card {
        width: 100%;
        max-width: none;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  // Selectors for store data
  metricOptions$!: Observable<{key: string, title: string}[]>;
  selectedMetricKey$!: Observable<string | null>;
  selectedMetric$!: Observable<ChartData | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  colorScheme$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Initialize the selectors after store is available
    this.metricOptions$ = this.store.select(DashboardSelectors.selectMetricOptions);
    this.selectedMetricKey$ = this.store.select(DashboardSelectors.selectSelectedMetricKey);
    this.selectedMetric$ = this.store.select(DashboardSelectors.selectSelectedMetric);
    this.loading$ = this.store.select(DashboardSelectors.selectLoading);
    this.error$ = this.store.select(DashboardSelectors.selectError);
    this.colorScheme$ = this.store.select(DashboardSelectors.selectColorScheme);
    
    this.loadData();
  }

  loadData(): void {
    this.store.dispatch(DashboardActions.loadDashboardData());
  }

  onMetricSelect(metricKey: string): void {
    this.store.dispatch(DashboardActions.selectMetric({ metricKey }));
  }

  onColorSchemeChange(colorScheme: string): void {
    this.store.dispatch(DashboardActions.changeColorScheme({ colorScheme }));
  }
} 