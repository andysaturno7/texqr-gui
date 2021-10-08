import { Component, Input, OnInit } from '@angular/core';
import { System, SystemsService } from 'src/app/services/systems.service';

@Component({
  selector: 'item-system',
  templateUrl: './item-system.component.html',
  styleUrls: ['./item-system.component.css'],
})
export class ItemSystemComponent implements OnInit {
  @Input('system') system: System;

  constructor() {}

  ngOnInit(): void {}
}
