import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRoomsComponent } from './table-rooms.component';

describe('TableRoomsComponent', () => {
  let component: TableRoomsComponent;
  let fixture: ComponentFixture<TableRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
