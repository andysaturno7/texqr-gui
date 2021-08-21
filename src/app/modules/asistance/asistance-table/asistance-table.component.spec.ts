import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistanceTableComponent } from './asistance-table.component';

describe('AsistanceTableComponent', () => {
  let component: AsistanceTableComponent;
  let fixture: ComponentFixture<AsistanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
