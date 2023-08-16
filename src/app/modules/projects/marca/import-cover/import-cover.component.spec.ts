import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCoverComponent } from './import-cover.component';

describe('ImportCoverComponent', () => {
  let component: ImportCoverComponent;
  let fixture: ComponentFixture<ImportCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
