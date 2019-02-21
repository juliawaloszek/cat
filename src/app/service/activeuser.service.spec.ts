import { TestBed } from '@angular/core/testing';

import { ActiveUserService } from './activeuser.service';

describe('ActiveuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveUserService = TestBed.get(ActiveUserService);
    expect(service).toBeTruthy();
  });
});
