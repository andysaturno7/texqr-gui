import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAsistanceComponent } from './root-asistance.component';

describe('RootAsistanceComponent', () => {
  let component: RootAsistanceComponent;
  let fixture: ComponentFixture<RootAsistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootAsistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootAsistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
