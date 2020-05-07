import { TestBed } from '@angular/core/testing';

import { OrderStatusCategoryService } from './order-status-category.service';

describe('OrderStatusCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderStatusCategoryService = TestBed.get(OrderStatusCategoryService);
    expect(service).toBeTruthy();
  });
});
