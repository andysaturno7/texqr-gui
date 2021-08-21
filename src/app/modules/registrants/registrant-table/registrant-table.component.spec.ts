import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantTableComponent } from './registrant-table.component';

describe('RegistrantTableComponent', () => {
  let component: RegistrantTableComponent;
  let fixture: ComponentFixture<RegistrantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrantTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
