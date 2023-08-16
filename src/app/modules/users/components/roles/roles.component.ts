import { Component, OnInit } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { PaginatedData } from 'src/app/interfaces/paginated-data';
import { UsersService } from '../../users.service';

@Component({
  selector: 'user-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  rolesData: PaginatedData<any>;

  columnMode = ColumnMode;
  selectionType = SelectionType;

  selected = [];

  constructor(private _user: UsersService) {}

  ngOnInit(): void {
    this._user
      .getRoles()
      .toPromise()
      .then((res: PaginatedData<any>) => {
        this.rolesData = res;
      });
  }

  onSelect(event) {}

  onPage(event) {}
}
