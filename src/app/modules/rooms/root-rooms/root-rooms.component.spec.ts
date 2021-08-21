import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRoomsComponent } from './root-rooms.component';

describe('RootRoomsComponent', () => {
  let component: RootRoomsComponent;
  let fixture: ComponentFixture<RootRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
