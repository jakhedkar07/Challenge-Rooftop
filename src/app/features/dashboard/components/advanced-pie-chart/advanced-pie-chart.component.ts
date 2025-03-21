import { Component, Input, OnInit, HostListener, ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartData } from '../../../../core/models/dashboard.model';

@Component({
  selector: 'app-advanced-pie-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="chart-container">
      <ng-container *ngIf="hasValidData(); else noData">
        <ngx-charts-advanced-pie-chart
          [view]="view"
          [scheme]="colorScheme"
          [results]="getChartData()"
          [gradient]="gradient"
          [animations]="animations"
          [valueFormatting]="valueFormatting">
        </ngx-charts-advanced-pie-chart>
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
export class AdvancedPieChartComponent implements OnInit {
  @Input() chartData: ChartData | null = null;
  @Input() colorScheme: any;
  
  view: [number, number] = [0, 0];
  gradient = false;
  animations = false;

  private resizeTimeout: any;

  hasValidData(): boolean {
    return !!this.chartData?.data && this.chartData.data.length > 0;
  }

  getChartData(): any[] {
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
      this.view = [Math.max(width * 0.9, 300), 400];
    }
  }

  valueFormatting(value: number): string {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } 
    return `$${(value / 1000).toFixed(0)}K`;
  }
} 