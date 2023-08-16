import { Component, OnInit } from '@angular/core';
import { UsersService, iUser } from '../../users.service';
import { PaginatedData } from 'src/app/interfaces/paginated-data';

@Component({
  selector: 'texqr-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
  users: PaginatedData<iUser>;

  constructor(private _user: UsersService) {}

  ngOnInit(): void {
    this._user
      .getUsers()
      .toPromise()
      .then((res: PaginatedData<iUser>) => {
        this.users = res;
      });
  }

  onUserDeleteCommand(id: string) {
    confirm('Estás seguro que deseas eliminar este registro?')
      ? this._user.removeUser(id).subscribe((res: { deleted: number }) => {
          if (res.deleted > 0)
            this.users.data = this.users.data.filter((item) => item.id !== id);
        }, console.log)
      : null;
  }

  onUserEditCommand(id: string) {}
}
