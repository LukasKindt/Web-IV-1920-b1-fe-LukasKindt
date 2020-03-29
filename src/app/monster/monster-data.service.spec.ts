import { TestBed } from '@angular/core/testing';

import { MonsterDataService } from './monster-data.service';

describe('MonsterDataService', () => {
  let service: MonsterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
