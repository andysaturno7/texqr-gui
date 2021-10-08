import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSystemComponent } from './item-system.component';

describe('ItemSystemComponent', () => {
  let component: ItemSystemComponent;
  let fixture: ComponentFixture<ItemSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
