import { Component, OnInit } from '@angular/core';
import { Dynamic } from 'src/app/models/dynamic.interface';
import { RegistrantsService } from 'src/app/services/registrants.service';

@Component({
  selector: 'projects-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(private _regis: RegistrantsService) {}

  ngOnInit(): void {}

  addDynamic(dynamic: Dynamic) {
    this._regis.addDynamic(dynamic);
  }

  deleteDynamic(id: number | string) {
    this._regis.deleteDynamic(id);
  }
}
