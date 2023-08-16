import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { IProject, ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'root-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  activeProject: IProject;
  constructor(
    private _project: ProjectsService,
    private _not: NotificationsService,
    private _route: ActivatedRoute
  ) {}

  generalFormIsCollapsed: boolean = false;
  dynamicsSegmentIsCollapsed: boolean = true;

  ngOnInit(): void {
    this.setActiveProject();
  }

  ngOnDestroy(): void {
    this._project.unselectProject();
  }

  setActiveProject() {
    let id = this._route.snapshot.paramMap.get('projectId');
    this._project.getProject(id).subscribe(
      (res) => {
        this._project.project = res;
        this.activeProject = res;
      },
      (error) => {
        console.log({ error });
      }
    );
  }
}
