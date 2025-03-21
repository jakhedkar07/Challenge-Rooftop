import { Component, Input, OnChanges, SimpleChanges, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from '../../../../core/models/dashboard.model';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { GaugeChartComponent } from '../gauge-chart/gauge-chart.component';
import { AdvancedPieChartComponent } from '../advanced-pie-chart/advanced-pie-chart.component';
import { getColorScheme } from '../color-utils';

@Component({
  selector: 'app-dynamic-chart',
  standalone: true,
  imports: [
    CommonModule,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    GaugeChartComponent,
    AdvancedPieChartComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dynamic-chart-container">
      <ng-container [ngSwitch]="chartData?.type">
        <app-bar-chart 
          *ngSwitchCase="'bar'" 
          [chartData]="chartData" 
          [colorScheme]="colorSchemeObj">
        </app-bar-chart>
        
        <app-line-chart 
          *ngSwitchCase="'line'" 
          [chartData]="chartData" 
          [colorScheme]="colorSchemeObj">
        </app-line-chart>
        
        <app-pie-chart 
          *ngSwitchCase="'pie'" 
          [chartData]="chartData" 
          [colorScheme]="colorSchemeObj">
        </app-pie-chart>
        
        <app-gauge-chart 
          *ngSwitchCase="'gauge'" 
          [chartData]="chartData" 
          [colorScheme]="colorSchemeObj">
        </app-gauge-chart>
        
        <ng-container *ngSwitchCase="'advanced-pie'">
          <!-- Use pie chart for Revenue by Region and Market Share Distribution -->
          <app-pie-chart 
            *ngIf="shouldUsePieChart" 
            [chartData]="chartData" 
            [colorScheme]="colorSchemeObj">
          </app-pie-chart>
          
          <app-advanced-pie-chart 
            *ngIf="!shouldUsePieChart" 
            [chartData]="chartData" 
            [colorScheme]="colorSchemeObj">
          </app-advanced-pie-chart>
        </ng-container>
        
        <div *ngSwitchDefault>
          <p>Unsupported chart type</p>
        </div>
      </ng-container>
    </div>
  `,
  styles: [`
    .dynamic-chart-container {
      height: 100%;
      width: 100%;
    }
  `]
})
export class DynamicChartComponent implements OnChanges, OnInit {
  @Input() chartData: ChartData | null = null;
  @Input() colorScheme: string = 'vivid';

  colorSchemeObj: any;
  shouldUsePieChart = false;

  ngOnInit() {
    this.colorSchemeObj = getColorScheme(this.colorScheme);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] || changes['colorScheme']) {
      // Only update color scheme object when necessary
      if (changes['colorScheme']) {
        this.colorSchemeObj = getColorScheme(this.colorScheme);
      }
      
      // Check if this chart should use pie chart component
      this.shouldUsePieChart = this.chartData?.title === 'Revenue by Region' || 
                              this.chartData?.title === 'Market Share Distribution';
    }
  }
} 