import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInputRoleComponent } from './group-input-role.component';

describe('GroupInputRoleComponent', () => {
  let component: GroupInputRoleComponent;
  let fixture: ComponentFixture<GroupInputRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupInputRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInputRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
