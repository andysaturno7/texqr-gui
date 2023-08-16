import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTemplatesComponent } from './select-templates.component';

describe('SelectTemplatesComponent', () => {
  let component: SelectTemplatesComponent;
  let fixture: ComponentFixture<SelectTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
