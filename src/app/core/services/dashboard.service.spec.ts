import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { ChartData } from '../models/dashboard.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve dashboard data from the API', () => {
    const mockData = {
      salesData: {
        title: 'Monthly Sales',
        type: 'bar',
        data: [
          { name: 'Jan', value: 42000 },
          { name: 'Feb', value: 38000 }
        ]
      },
      userEngagement: {
        title: 'User Engagement',
        type: 'line',
        data: [
          { name: 'Week 1', series: [{ name: 'Active Users', value: 2500 }] }
        ]
      }
    };

    service.getDashboardData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/data/dashboard-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
}); 