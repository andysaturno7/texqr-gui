import { Component, OnInit } from '@angular/core';
import { StoredTemplate, TemplatesService } from '../../templates.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'texqr-mail-templates',
  templateUrl: './mail-templates.component.html',
  styleUrls: ['./mail-templates.component.css'],
})
export class MailTemplatesComponent implements OnInit {
  templates: StoredTemplate[];

  constructor(
    private _template: TemplatesService,
    private _not: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getTemplates();
  }

  getTemplates() {
    this._template.getAll().subscribe(
      (res) => {
        this.templates = res;
      },
      (error) => {
        console.log({ error });
      }
    );
  }

  deleteTemplate(id: string) {
    this._template.deleteTemplate(id).subscribe((res) => {
      if (res) this.ngOnInit();
    }, console.log);
  }
}
