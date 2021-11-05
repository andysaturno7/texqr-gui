import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Room, RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  subscRooms: Subscription;

  addForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    capacity: [''],
    useDefaultRegistrants: [true],
    parentRoom: [''],
  });

  constructor(private fb: FormBuilder, private _room: RoomsService) {
    this.subscRooms = _room.rooms.subscribe((res) => {
      this.rooms = res;
    }, console.log);
  }

  ngOnInit(): void {
    this._room.invokeRooms();
  }

  ngOnDestroy(): void {
    this.subscRooms.unsubscribe();
  }

  addRoom() {
    let parentRoomValue = this.addForm.value.parentRoom;
    if (
      parentRoomValue == 'null' ||
      parentRoomValue == '' ||
      parentRoomValue == null
    ) {
      delete this.addForm.value.parentRoom;
    }
    this._room.addRoom(this.addForm.value);
    this.addForm.reset();
    this.addForm.patchValue({ useDefaultRegistrants: true });
  }
}
