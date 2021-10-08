import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Room, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'table-rooms',
  templateUrl: './table-rooms.component.html',
  styleUrls: ['./table-rooms.component.css'],
})
export class TableRoomsComponent implements OnInit, OnDestroy {
  rooms: Room[];
  roomSubsc: Subscription;
  clipboardMobileActive: boolean = false;
  mobileToken: string = '';

  constructor(private _rooms: RoomsService) {}

  ngOnInit(): void {
    this.roomSubsc = this.subscRooms();
  }

  ngOnDestroy(): void {
    this.roomSubsc.unsubscribe();
  }

  subscRooms() {
    return this._rooms.rooms.subscribe(
      (res) => {
        this.rooms = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  delete(id) {
    if (confirm('Estás seguro de borrar la sala?')) {
      this._rooms.deleteRoom(id);
    }
  }

  createMobileUrl(roomId: number | string) {
    this._rooms
      .createMobileUrl(roomId)
      .then((url: string) => {
        this.mobileToken = url;
        this.clipboardMobileActive = true;
      })
      .catch(console.log);
  }
}
