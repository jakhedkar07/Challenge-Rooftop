import { Component, Input, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { ChartData } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-gauge-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chart-container">
      <ng-container *ngIf="hasValidData(); else noData">
        <ngx-charts-gauge
          [view]="view"
          [scheme]="colorScheme"
          [results]="getChartData()"
          [legend]="showLegend"
          [legendPosition]="legendPosition"
          [min]="min"
          [max]="max"
          [units]="units"
          [bigSegments]="bigSegments"
          [smallSegments]="smallSegments"
          [animations]="animations">
        </ngx-charts-gauge>
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
      height: 400px;
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
export class GaugeChartComponent implements OnInit {
  @Input() chartData: ChartData | null = null;
  @Input() colorScheme: any;
  
  view: [number, number] = [0, 0];
  showLegend = true;
  legendPosition = LegendPosition.Below;
  min = 0;
  max = 100;
  units = '';
  bigSegments = 10;
  smallSegments = 5;
  animations = false; // Disable animations for better performance

  private resizeTimeout: any;

  hasValidData(): boolean {
    return !!this.chartData?.data && this.chartData.data.length > 0;
  }

  getChartData(): any[] {
    return this.chartData?.data || [];
  }

  @HostListener('window:resize')
  onResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.setChartDimensions(), 150);
  }

  ngOnInit() {
    this.setChartDimensions();
  }

  private setChartDimensions() {
    const container = document.querySelector('.chart-container');
    if (container) {
      const width = container.clientWidth;
      this.view = [Math.max(width * 0.8, 300), 350];
    }
  }
} 