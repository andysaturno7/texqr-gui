import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProject } from 'src/app/services/projects.service';

@Component({
  selector: 'item-project',
  templateUrl: './item-project.component.html',
  styleUrls: ['./item-project.component.css'],
})
export class ItemProjectComponent implements OnInit {
  @Input('project') project: IProject;
  @Output('onDelete') delete: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  deleteProject(id: string) {
    this.delete.emit(id);
  }
}
