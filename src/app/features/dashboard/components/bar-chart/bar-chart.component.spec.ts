import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartData } from '../../../../core/models/dashboard.model';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BarChartComponent,
        NgxChartsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle undefined chart data', () => {
    component.chartData = null;
    fixture.detectChanges();
    
    // Should not throw an error when chart data is null
    expect(component).toBeTruthy();
    
    // There should be a no data message
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-data')).toBeTruthy();
  });

  it('should show chart when data is available', () => {
    const testData: ChartData = {
      title: 'Test Chart',
      type: 'bar',
      data: [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 }
      ]
    };
    
    component.chartData = testData;
    fixture.detectChanges();
    
    // Chart should be visible
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('ngx-charts-bar-vertical')).toBeTruthy();
  });

  it('should update xAxisLabel when chartData changes', () => {
    const testData: ChartData = {
      title: 'Test Title',
      type: 'bar',
      data: [{ name: 'A', value: 10 }]
    };
    
    component.chartData = testData;
    component.ngOnChanges({
      chartData: {
        currentValue: testData,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });
    
    expect(component.xAxisLabel).toBe('Test Title');
  });

  it('should set dimensions on init', () => {
    spyOn<any>(component, 'setChartDimensions');
    component.ngOnInit();
    expect(component['setChartDimensions']).toHaveBeenCalled();
  });
}); 