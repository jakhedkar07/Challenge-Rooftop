import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ChartData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getDashboardData(): Observable<{ [key: string]: ChartData }> {
    return this.http.get<{ [key: string]: ChartData }>('assets/data/dashboard-data.json').pipe(
      catchError(error => {
        console.error('Error fetching dashboard data:', error);
        return throwError(() => new Error('Failed to load dashboard data'));
      })
    );
  }
} 