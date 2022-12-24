import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganaizationRegesterComponent } from './organaization-regester.component';

describe('OrganaizationRegesterComponent', () => {
  let component: OrganaizationRegesterComponent;
  let fixture: ComponentFixture<OrganaizationRegesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganaizationRegesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganaizationRegesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
