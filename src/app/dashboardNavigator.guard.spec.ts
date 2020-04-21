import { TestBed } from '@angular/core/testing';

import { DashboardNavigatorGuard } from './dashboard-navigator.guard';

describe('DashboardNavigatorGuard', () => {
  let guard: DashboardNavigatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardNavigatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
