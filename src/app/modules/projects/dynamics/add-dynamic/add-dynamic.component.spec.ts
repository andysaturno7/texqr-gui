import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDynamicComponent } from './add-dynamic.component';

describe('AddDynamicComponent', () => {
  let component: AddDynamicComponent;
  let fixture: ComponentFixture<AddDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
