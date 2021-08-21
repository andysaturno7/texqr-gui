import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSystemsComponent } from './root-systems.component';

describe('RootSystemsComponent', () => {
  let component: RootSystemsComponent;
  let fixture: ComponentFixture<RootSystemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootSystemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
