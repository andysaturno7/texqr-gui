import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PageInfo, PaginatedData } from 'src/app/interfaces/paginated-data';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Room, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'root-rooms',
  templateUrl: './root-rooms.component.html',
  styleUrls: ['./root-rooms.component.css'],
})
export class RootRoomsComponent implements OnInit {
  dataRooms: PaginatedData<Room>;
  dataRoomsFilter: string = '';

  modalRef: BsModalRef;

  constructor(
    private _rooms: RoomsService,
    private _toast: NotificationsService,
    private _modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getRooms({ offset: 0, limit: 15 });
  }

  getRooms(pageInfo: PageInfo): void {
    this._rooms
      .getRooms(pageInfo.offset, pageInfo.limit, this.dataRoomsFilter)
      .subscribe(
        (res: PaginatedData<Room>) => {
          console.log({ res });

          this.dataRooms = res;
        },
        (error) => {
          this._toast.showError(error, 'Problema al cargar datos.');
        }
      );
  }

  exportAsistancesByRoom(room: Room) {
    this._rooms.getAsistances(room);
  }

  onSelect(event) {
    console.log(event);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }
}
