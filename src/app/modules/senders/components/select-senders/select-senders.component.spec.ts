import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSendersComponent } from './select-senders.component';

describe('SelectSendersComponent', () => {
  let component: SelectSendersComponent;
  let fixture: ComponentFixture<SelectSendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
