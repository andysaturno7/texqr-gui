import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'src/app/services/electron.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  isElectron: any = null;

  participants: string[] = [
    'Andy Gabriel Sanchez Sandoval',
    'Gabrielon',
    'Sanchez',
    'Sandoval',
    'Eriberto',
  ];
  condition: any;

  data: any;

  n: number;

  constructor(private _electron: ElectronService) {
    this.isElectron = _electron.isElectron();
  }

  ngOnInit(): void {}

  update() {}

  dragover(ev: any) {
    ev.preventDefault();
  }

  drop(ev: any) {
    console.log(ev);
  }
}
