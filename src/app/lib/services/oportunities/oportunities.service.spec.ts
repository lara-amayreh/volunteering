import { TestBed } from '@angular/core/testing';

import { OportunitiesService } from './oportunities.service';

describe('OportunitiesService', () => {
  let service: OportunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OportunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
