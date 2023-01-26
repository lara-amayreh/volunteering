import { TestBed } from '@angular/core/testing';

import { OrgnotificationService } from './orgnotification.service';

describe('OrgnotificationService', () => {
  let service: OrgnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
