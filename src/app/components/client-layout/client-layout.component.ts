import { Component, OnInit } from '@angular/core';
import { RegistrantsService } from 'src/app/services/registrants.service';

@Component({
  selector: 'client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
})
export class ClientLayoutComponent implements OnInit {
  activeMenu: boolean = false;
  constructor(private _regis: RegistrantsService) {}

  ngOnInit(): void {}

  log() {
    console.log(this.activeMenu);
  }
}
