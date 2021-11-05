import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsOptionsComponent } from './rooms-options.component';

describe('RoomsOptionsComponent', () => {
  let component: RoomsOptionsComponent;
  let fixture: ComponentFixture<RoomsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
