import { Component, Input, OnInit, HostListener, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartData } from '../../../../core/models/dashboard.model';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chart-container">
      <ng-container *ngIf="hasValidData(); else noData">
        <ngx-charts-pie-chart
          [view]="view"
          [scheme]="colorScheme"
          [results]="getChartData()"
          [gradient]="gradient"
          [legend]="showLegend"
          [legendPosition]="legendPosition"
          [labels]="showLabels"
          [doughnut]="doughnut"
          [tooltipDisabled]="false"
          [animations]="animations">
        </ngx-charts-pie-chart>
      </ng-container>
      <ng-template #noData>
        <div class="no-data">
          <p>No data available for this chart</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .chart-container {
      height: 450px;
      width: 100%;
    }
    .no-data {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      color: #888;
      font-size: 16px;
    }
  `]
})
export class PieChartComponent implements OnInit {
  @Input() chartData: ChartData | null = null;
  @Input() colorScheme: any;
  
  view: [number, number] = [0, 0];
  gradient = true;
  showLegend = true;
  showLabels = true;
  doughnut = true;
  legendPosition = LegendPosition.Right;
  animations = false; // Disable animations for better performance

  private resizeTimeout: any;

  hasValidData(): boolean {
    return !!this.chartData?.data && this.chartData.data.length > 0;
  }

  getChartData(): any[] {
    // Make sure all data points have proper names to avoid undefined labels
    if (this.chartData?.data) {
      return this.chartData.data.map(item => ({
        name: item.name || 'Unknown',
        value: item.value
      }));
    }
    return [];
  }

  @HostListener('window:resize')
  onResize() {
    // Debounce resize events to prevent excessive calculations
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.setChartDimensions(), 150);
  }

  ngOnInit() {
    this.setChartDimensions();
  }

  private setChartDimensions() {
    const container = document.querySelector('.chart-container');
    if (container) {
      // Use container width but with fixed height for better performance
      const width = container.clientWidth;
      this.view = [Math.max(width * 0.8, 300), 400];
    }
  }
} 