import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsTableComponent } from './systems-table.component';

describe('SystemsTableComponent', () => {
  let component: SystemsTableComponent;
  let fixture: ComponentFixture<SystemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
