import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'side-client',
  templateUrl: './side-client.component.html',
  styleUrls: ['./side-client.component.css'],
})
export class SideClientComponent implements OnInit {
  @Output() selected = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    this.selected.emit();
  }
}
