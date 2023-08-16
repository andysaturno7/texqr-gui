import { Component, OnInit, Input } from '@angular/core';
import { Stored } from 'src/app/models/utils.types';
import {
  TemplatesService,
  iTemplate,
} from 'src/app/modules/templates/templates.service';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-select-templates',
  templateUrl: './select-templates.component.html',
  styleUrls: ['./select-templates.component.css'],
})
export class SelectTemplatesComponent implements OnInit {
  @Input('project') selectedProject: IProject;
  stickerTemplates: Stored<iTemplate>[] = [];
  mailTemplates: Stored<iTemplate>[] = [];

  stickerTemplateSelected: string;
  mailTemplateSelected: string;

  constructor(
    private _templates: TemplatesService,
    private _project: ProjectsService
  ) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this._templates.getAll().subscribe((res) => {
      res.forEach((template, idx) => {
        if (template.type === 'mail') this.mailTemplates.push(template);
        if (template.type === 'sticker') this.stickerTemplates.push(template);
      });
      this.setTemplateSelectIfExist();
    }, console.log);
  }

  setTemplateSelectIfExist() {
    let stickerTemplate = this.stickerTemplates.filter(
      (t) => t.id === this._project.project.StickerTemplateId
    );
    this.stickerTemplateSelected =
      stickerTemplate.length > 0 ? stickerTemplate[0].id : null;
    let mailTemplate = this.mailTemplates.filter(
      (t) => t.id === this._project.project.MailTemplateId
    );
    this.mailTemplateSelected =
      mailTemplate.length > 0 ? mailTemplate[0].id : null;
  }

  saveTemplate() {
    let project = this._project.project;
    project.StickerTemplateId = this.stickerTemplateSelected;
    project.MailTemplateId = this.mailTemplateSelected;
    this._project.updateProject(project).subscribe((res) => {}, console.log);
  }
}
