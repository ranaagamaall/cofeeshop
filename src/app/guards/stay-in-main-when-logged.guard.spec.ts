import { TestBed } from '@angular/core/testing';

import { StayInMainWhenLoggedGuard } from './stay-in-main-when-logged.guard';

describe('StayInMainWhenLoggedGuard', () => {
  let guard: StayInMainWhenLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StayInMainWhenLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
