import { TestBed } from '@angular/core/testing';

import { DishDataUpdateService } from './dish-data-update.service';

describe('DishDataUpdateService', () => {
  let service: DishDataUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishDataUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
