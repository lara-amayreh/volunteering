import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOnActivityComponent } from './apply-on-activity.component';

describe('ApplyOnActivityComponent', () => {
  let component: ApplyOnActivityComponent;
  let fixture: ComponentFixture<ApplyOnActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyOnActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyOnActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
