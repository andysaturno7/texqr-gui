import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegistrantFormComponent } from './add-registrant-form.component';

describe('AddRegistrantFormComponent', () => {
  let component: AddRegistrantFormComponent;
  let fixture: ComponentFixture<AddRegistrantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegistrantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegistrantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
