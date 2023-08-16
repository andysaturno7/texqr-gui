import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NotificationsService } from 'src/app/services/notifications.service';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'texqr-import-cover',
  templateUrl: './import-cover.component.html',
  styleUrls: ['./import-cover.component.css'],
})
export class ImportCoverComponent implements OnInit {
  src: SafeResourceUrl;
  @Input('limitSize') limitSize: number = 1024;
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
    let { cover } = this.project.keys;
    if (cover.length > 0) this.src = cover;
  }

  handleSelectedCover(event) {
    if (event.target.files.length > 0) {
      this._project
        .updateImageMarca('cover', event.target.files[0])
        .subscribe((res) => {
          this.src = res.path;
        }, this._not.showError);
      // let src = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   URL.createObjectURL(event.target.files[0])
      // );
      // this.src = src;
    }
  }

  eliminarCover() {
    this._project.removeImageMarca('cover').subscribe((res) => {
      if (res.updated[0] > 0) this.src = null;
    }, this._not.showError);
  }
}
