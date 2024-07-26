import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stored } from 'src/app/models/utils.types';
import { iUser } from 'src/app/modules/users/users.service';

@Component({
  selector: 'side-client',
  templateUrl: './side-client.component.html',
  styleUrls: ['./side-client.component.css'],
})
export class SideClientComponent implements OnInit {
  user: Stored<iUser> = JSON.parse(localStorage.getItem('musicUser'));
  @Output() selected = new EventEmitter<any>();
  isCollapsed: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    this.selected.emit();
  }
}
