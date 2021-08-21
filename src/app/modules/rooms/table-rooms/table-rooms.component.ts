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
}
