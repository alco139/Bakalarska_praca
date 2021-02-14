import { TestBed } from '@angular/core/testing';

import { UserMatchService } from './user-match.service';

describe('UserMatchService', () => {
  let service: UserMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
