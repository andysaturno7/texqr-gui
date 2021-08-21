import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootRegistrantsComponent } from './root-registrants.component';

describe('RootRegistrantsComponent', () => {
  let component: RootRegistrantsComponent;
  let fixture: ComponentFixture<RootRegistrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootRegistrantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootRegistrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
