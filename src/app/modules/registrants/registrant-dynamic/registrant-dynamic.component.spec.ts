import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrantDynamicComponent } from './registrant-dynamic.component';

describe('RegistrantDynamicComponent', () => {
  let component: RegistrantDynamicComponent;
  let fixture: ComponentFixture<RegistrantDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrantDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrantDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
