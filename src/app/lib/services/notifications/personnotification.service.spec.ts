import { TestBed } from '@angular/core/testing';

import { PersonnotificationService } from './personnotification.service';

describe('PersonnotificationService', () => {
  let service: PersonnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
