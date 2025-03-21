import { Component, Input, OnChanges, SimpleChanges, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { ChartData } from '../../../../core/models/dashboard.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chart-container">
      <ng-container *ngIf="hasValidData(); else noData">
        <ngx-charts-bar-vertical
          [view]="view"
          [scheme]="colorScheme"
          [results]="getChartData()"
          [gradient]="gradient"
          [xAxis]="showXAxis"
          [yAxis]="showYAxis"
          [legend]="showLegend"
          [showXAxisLabel]="showXAxisLabel"
          [showYAxisLabel]="showYAxisLabel"
          [xAxisLabel]="xAxisLabel"
          [yAxisLabel]="yAxisLabel"
          [animations]="animations">
        </ngx-charts-bar-vertical>
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
export class BarChartComponent implements OnChanges, OnInit {
  @Input() chartData: ChartData | null = null;
  @Input() colorScheme: any;

  view: [number, number] = [0, 0];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Category';
  yAxisLabel = 'Value';
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartData) {
      this.xAxisLabel = this.chartData.title;
    }
  }

  private setChartDimensions() {
    const container = document.querySelector('.chart-container');
    if (container) {
      const width = container.clientWidth;
      this.view = [Math.max(width * 0.8, 300), 400];
    }
  }
} 