import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css'],
})
export class DynamicComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  data: any;
}
