import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSenderComponent } from './create-sender.component';

describe('CreateSenderComponent', () => {
  let component: CreateSenderComponent;
  let fixture: ComponentFixture<CreateSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
