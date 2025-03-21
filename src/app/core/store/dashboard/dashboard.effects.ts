import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  // Define the effect with a return type so TypeScript doesn't complain
  loadDashboardData$ = createEffect(() => 
    of(DashboardActions.loadDashboardData)
  , { dispatch: false });  // Set dispatch to false

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store: Store
  ) {
    // Set up manual subscription in constructor
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboardData)
    ).subscribe(() => {
      this.dashboardService.getDashboardData().subscribe({
        next: (metrics) => {
          this.store.dispatch(DashboardActions.loadDashboardDataSuccess({ metrics }));
        },
        error: (error) => {
          this.store.dispatch(DashboardActions.loadDashboardDataFailure({ 
            error: error.message || 'Failed to load dashboard data' 
          }));
        }
      });
    });
  }
} 