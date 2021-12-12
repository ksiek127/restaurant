import { TestBed } from '@angular/core/testing';

import { ReviewUpdateService } from './review-update.service';

describe('ReviewUpdateService', () => {
  let service: ReviewUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
