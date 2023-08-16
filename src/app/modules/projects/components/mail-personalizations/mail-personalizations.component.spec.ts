import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailPersonalizationsComponent } from './mail-personalizations.component';

describe('MailPersonalizationsComponent', () => {
  let component: MailPersonalizationsComponent;
  let fixture: ComponentFixture<MailPersonalizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailPersonalizationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailPersonalizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
