import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDynamicsComponent } from './add-dynamics.component';

describe('AddDynamicsComponent', () => {
  let component: AddDynamicsComponent;
  let fixture: ComponentFixture<AddDynamicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDynamicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDynamicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
