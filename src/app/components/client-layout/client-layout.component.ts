import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
})
export class ClientLayoutComponent implements OnInit {
  activeMenu: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  log() {
    console.log(this.activeMenu);
  }
}
