import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'src/app/services/notifications.service';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-import-logo',
  templateUrl: './import-logo.component.html',
  styleUrls: ['./import-logo.component.css'],
})
export class ImportLogoComponent implements OnInit {
  src: string | any;
  project: IProject;
  location: string;

  constructor(
    private sanitizer: DomSanitizer,
    private _project: ProjectsService,
    private _not: NotificationsService
  ) {
    this.project = this._project.project;
    this.location = window.location.origin;
  }

  ngOnInit(): void {
    let { logo } = this.project.keys;
    if (logo.length > 0) this.src = logo;
  }

  handleSelectedLogo(event) {
    if (event.target.files.length > 0) {
      this._project
        .updateImageMarca('logo', event.target.files[0])
        .subscribe((res) => {
          this.src = res.path;
        }, this._not.showError);
    }
  }

  eliminarLogo() {
    this._project.removeImageMarca('logo').subscribe((res) => {
      if (res.updated[0] > 0) this.src = null;
    }, this._not.showError);
  }
}
