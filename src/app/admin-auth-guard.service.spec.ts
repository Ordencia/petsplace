import { TestBed } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth-guard.service';

describe('AdminAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAuthGuard = TestBed.get(AdminAuthGuard);
    expect(service).toBeTruthy();
  });
});
