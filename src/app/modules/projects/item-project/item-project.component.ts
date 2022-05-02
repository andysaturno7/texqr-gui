import { Component, Input, OnInit } from '@angular/core';
import { IProject } from 'src/app/services/projects.service';

@Component({
  selector: 'item-project',
  templateUrl: './item-project.component.html',
  styleUrls: ['./item-project.component.css'],
})
export class ItemProjectComponent implements OnInit {
  @Input('project') project: IProject;

  constructor() {}

  ngOnInit(): void {}
}
