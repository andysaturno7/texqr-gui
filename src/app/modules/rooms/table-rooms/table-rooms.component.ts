import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Room, RoomsService } from 'src/app/services/rooms.service';
import { RoomsOptionsComponent } from '../../shared/agRenderer/rooms-options/rooms-options.component';

@Component({
  selector: 'table-rooms',
  templateUrl: './table-rooms.component.html',
  styleUrls: ['./table-rooms.component.css'],
})
export class TableRoomsComponent implements OnInit, OnDestroy {
  rooms: Room[];
  private roomSubsc: Subscription;
  clipboardMobileActive: boolean = false;
  mobileToken: string = '';

  context: any;
  @ViewChild('agGrid') table: AgGridAngular;
  defaultColDef = {
    minWidth: 120,
    editable: true,
    flex: 1,
    resizable: true,
    filter: true,
  };
  columnDefs = [
    {
      field: '',
      headerName: '',
      cellRendererFramework: RoomsOptionsComponent,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: false,
      pinned: 'left',
      editable: false,
      maxWidth: 70,
      flex: 1,
    },
    {
      field: 'id',
      headerName: '#',
      editable: false,
      maxWidth: 60,
    },
    { field: 'name', headerName: 'Nombre' },
    { field: 'capacity', headerName: 'Capacidad' },
    { field: 'mobile', headerName: 'link Mobile' },
    { field: 'parentRoom', headerName: 'Sala Padre' },
  ];

  constructor(
    private _rooms: RoomsService,
    private _toast: NotificationsService
  ) {
    this.context = { componentParent: this };
  }

  ngOnInit(): void {
    this.roomSubsc = this.subscRooms();
  }

  ngOnDestroy(): void {
    this.roomSubsc.unsubscribe();
  }

  subscRooms() {
    return this._rooms.rooms.subscribe(
      (res) => {
        res.forEach(async (room) => {
          room['mobile'] = await this._rooms.createMobileUrl(room.id);
        });
        this.rooms = res;
      },
      (err) => {
        this._toast.showError(err, err.message);
      }
    );
  }

  deleteItem(id) {
    if (confirm('Estás seguro de borrar la sala?')) {
      this._rooms.deleteRoom(id);
    }
  }

  editItem(event: any) {
    let data = event.data;
    delete data.mobile;
    this._rooms.editRoom(data);
  }

  exportTable() {
    this.table.api.exportDataAsCsv({ fileName: 'roomData' });
  }

  createMobileUrl(roomId: number | string) {
    this._rooms
      .createMobileUrl(roomId)
      .then((url: string) => {
        this.mobileToken = url;
        this.clipboardMobileActive = true;
      })
      .catch((error: Error) => {
        this._toast.showError(error, error.message);
      });
  }
}
