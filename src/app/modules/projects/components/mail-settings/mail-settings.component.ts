import { Component, OnInit } from '@angular/core';
import { Stored } from 'src/app/models/utils.types';
import { iSender } from 'src/app/modules/senders/sender.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-mail-settings',
  templateUrl: './mail-settings.component.html',
  styleUrls: ['./mail-settings.component.css'],
})
export class MailSettingsComponent implements OnInit {
  selectedProject: IProject;
  constructor(
    private _project: ProjectsService,
    private _not: NotificationsService
  ) {
    this.selectedProject = this._project.project;
  }

  ngOnInit(): void {}

  onSenderSelected(sender: Stored<iSender>) {
    let project = this.selectedProject;
    project.SenderId = sender.id;
    this._project.updateProject(project).subscribe(
      (res) => {},
      (error) => {}
    );
  }

  onSenderUnselected() {
    let project = this.selectedProject;
    project.SenderId = '';
    this._project.updateProject(project);
  }

  onPersonalizationsChanged(changes) {
    let project = this.selectedProject;
    project.keys = { ...project.keys, ...changes };

    this._project.updateProject(project).subscribe((res) => {
      this._not.showSuccess('Proyecto Actualizado..');
    }, console.log);
  }
}
