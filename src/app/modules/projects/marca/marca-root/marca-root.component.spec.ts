import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaRootComponent } from './marca-root.component';

describe('MarcaRootComponent', () => {
  let component: MarcaRootComponent;
  let fixture: ComponentFixture<MarcaRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcaRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
