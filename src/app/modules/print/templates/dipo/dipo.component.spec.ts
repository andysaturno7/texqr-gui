import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DipoComponent } from './dipo.component';

describe('DipoComponent', () => {
  let component: DipoComponent;
  let fixture: ComponentFixture<DipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
