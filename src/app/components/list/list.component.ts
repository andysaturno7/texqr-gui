import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  update() {}

  dragover(ev: any) {
    ev.preventDefault();
  }

  drop(ev: any) {
    console.log(ev);
  }
}
