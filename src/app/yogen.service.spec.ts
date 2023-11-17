import { TestBed } from '@angular/core/testing';

import { YogenService } from './yogen.service';

describe('YogenService', () => {
  let service: YogenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YogenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
