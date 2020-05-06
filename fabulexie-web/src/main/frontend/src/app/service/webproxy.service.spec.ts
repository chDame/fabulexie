import { TestBed } from '@angular/core/testing';

import { WebproxyService } from './webproxy.service';

describe('WebproxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebproxyService = TestBed.get(WebproxyService);
    expect(service).toBeTruthy();
  });
});
