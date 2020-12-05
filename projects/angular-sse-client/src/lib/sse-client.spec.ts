import { TestBed } from '@angular/core/testing';

import { SseClient } from './sse-client';

describe('SseClientService', () => {
  let service: SseClient;
  var originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    TestBed.configureTestingModule({});
    service = TestBed.inject(SseClient);
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get result and raise error', function (done) {
    let SampleURL = 'http://localhost:8181/sse';

    var ob = service.get(SampleURL);
    
    ob.subscribe(
      data => {
        expect(data).toBeInstanceOf(Number);
      },
      err => {
        expect(err).toBeTruthy();
        done();
      },
      () => {
        fail('should not complete regularly');
        done();
      });
  });

  it('should get result and complete when timeout', function (done) {
    let SampleURL = 'http://localhost:8181/sse';

    var ob = service.get(SampleURL, { duration: 5000 });
    let touched = false;

    ob.subscribe(data => {
      expect(data).toBeInstanceOf(Number);
      touched = true;
    }, err => {
      fail('should not cause error');
      done();
    }, () => {
      expect(touched).toBeTruthy();
      done();
    });
  });
});
