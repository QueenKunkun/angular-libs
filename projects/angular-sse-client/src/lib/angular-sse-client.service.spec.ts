import { TestBed } from '@angular/core/testing';

import { AngularSseClientService } from './angular-sse-client.service';

describe('AngularSseClientService', () => {
  let service: AngularSseClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSseClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
