import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRegesterComponent } from './person-regester.component';

describe('PersonRegesterComponent', () => {
  let component: PersonRegesterComponent;
  let fixture: ComponentFixture<PersonRegesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRegesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonRegesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
