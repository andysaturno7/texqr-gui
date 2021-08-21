import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrRendererComponent } from './qr-renderer.component';

describe('QrRendererComponent', () => {
  let component: QrRendererComponent;
  let fixture: ComponentFixture<QrRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
