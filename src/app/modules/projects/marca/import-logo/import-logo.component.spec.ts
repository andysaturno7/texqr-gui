import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLogoComponent } from './import-logo.component';

describe('ImportLogoComponent', () => {
  let component: ImportLogoComponent;
  let fixture: ComponentFixture<ImportLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
