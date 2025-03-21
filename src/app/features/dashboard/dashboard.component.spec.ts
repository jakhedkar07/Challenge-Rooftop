import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DynamicChartComponent } from './components/dynamic-chart/dynamic-chart.component';
import * as DashboardActions from '../../core/store/dashboard/dashboard.actions';
import * as DashboardSelectors from '../../core/store/dashboard/dashboard.selectors';
import { MemoizedSelector } from '@ngrx/store';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;
  let mockMetricOptionsSelector: MemoizedSelector<any, any>;
  let mockSelectedMetricKeySelector: MemoizedSelector<any, any>;
  let mockSelectedMetricSelector: MemoizedSelector<any, any>;
  let mockLoadingSelector: MemoizedSelector<any, any>;
  let mockErrorSelector: MemoizedSelector<any, any>;
  let mockColorSchemeSelector: MemoizedSelector<any, any>;

  const initialState = {
    dashboard: {
      metrics: {
        salesData: {
          title: 'Monthly Sales',
          type: 'bar',
          data: [
            {name: 'Jan', value: 42000},
            {name: 'Feb', value: 38000}
          ]
        }
      },
      selectedMetricKey: 'salesData',
      loading: false,
      error: null,
      colorScheme: 'rich'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .overrideComponent(DashboardComponent, {
      remove: { imports: [DynamicChartComponent] },
      add: { 
        imports: [] 
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    
    spyOn(store, 'dispatch').and.callThrough();
    
    // Mock the selectors
    mockMetricOptionsSelector = store.overrideSelector(
      DashboardSelectors.selectMetricOptions,
      []
    );
    mockSelectedMetricKeySelector = store.overrideSelector(
      DashboardSelectors.selectSelectedMetricKey,
      null
    );
    mockSelectedMetricSelector = store.overrideSelector(
      DashboardSelectors.selectSelectedMetric,
      null
    );
    mockLoadingSelector = store.overrideSelector(
      DashboardSelectors.selectLoading,
      false
    );
    mockErrorSelector = store.overrideSelector(
      DashboardSelectors.selectError,
      null
    );
    mockColorSchemeSelector = store.overrideSelector(
      DashboardSelectors.selectColorScheme,
      'vivid'
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadDashboardData action on initialization', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      DashboardActions.loadDashboardData()
    );
  });

  it('should dispatch selectMetric action when metric selection changes', () => {
    const metricKey = 'userEngagement';
    component.onMetricSelect(metricKey);
    
    expect(store.dispatch).toHaveBeenCalledWith(
      DashboardActions.selectMetric({ metricKey })
    );
  });

  it('should dispatch changeColorScheme action when color scheme changes', () => {
    const colorScheme = 'cool';
    component.onColorSchemeChange(colorScheme);
    
    expect(store.dispatch).toHaveBeenCalledWith(
      DashboardActions.changeColorScheme({ colorScheme })
    );
  });

  it('should display error message when error occurs', () => {
    store.setState({
      dashboard: {
        ...initialState.dashboard,
        error: 'Failed to load data',
        loading: false
      }
    });
    fixture.detectChanges();
    
    const errorElement = fixture.debugElement.query(By.css('.error-container'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Failed to load data');
  });

  it('should display loading spinner when loading is true', () => {
    store.setState({
      dashboard: {
        ...initialState.dashboard,
        loading: true
      }
    });
    fixture.detectChanges();
    
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });
}); 