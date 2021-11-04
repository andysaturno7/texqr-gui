import { TestBed } from '@angular/core/testing';

import { CustomselectsService } from './customselects.service';

describe('CustomselectsService', () => {
  let service: CustomselectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomselectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
